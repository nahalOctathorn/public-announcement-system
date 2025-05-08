import React, { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useConfirm } from "@/hooks/use-confirm";
import { ConfirmDialog } from "./layout/app-alert-dialog";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { FormBaseProps, FormHandler } from "./form-handler";
import { useApiQuery } from "@/hooks/use-api-query";
import { Id, ItemActionProps, MessageResponse } from "@/@types/general.type";
import { toast } from "sonner";
import { ListParamsWithId } from "@/@types/api.type";
import { on } from "events";

export type TViewFormExtraProps<TData> = {
  open: boolean;
  closeForm: () => void;
  values: TData | null;
  isEditMode: boolean;
};

export type MutationFns<TFormData, TResponse> = {
  deleteFn?: (id: number) => Promise<void>;
  updateFn?: (params: Id) => (item: TFormData) => Promise<MessageResponse>;
  createFn?: (
    item: Omit<TFormData, "id" | "createdAt" | "updatedAt">
  ) => Promise<TResponse>;
  onSuccess?: (
    action: string
  ) => (response: TResponse | MessageResponse | void) => void;
};

export interface ViewBaseProps<TData> {
  data: TData | null;
  loading: boolean;
  error: string | null;
  open: boolean;
  onItemAction: (action: ItemActionProps) => void;
}

interface ViewHandlerProps<
  TData,
  TUpdateData,
  TResponse,
  TViewExtraProps,
  TFormExtraProps
> {
  queryKey: string | any[];
  queryFn: (params: ListParamsWithId) => Promise<TData>;
  params?: ListParamsWithId;
  ViewComponent?: React.ComponentType<ViewBaseProps<TData> & TViewExtraProps>;
  FormComponent?: React.ComponentType<
    FormBaseProps<TUpdateData, TResponse> &
      TFormExtraProps &
      TViewFormExtraProps<TData>
  >;
  onParentItemAction?: (action: ItemActionProps) => void;
  itemAction?: ItemActionProps | null;
  mutationFns?: MutationFns<TUpdateData, TResponse>;
  viewProps?: TViewExtraProps;
  formProps?: TFormExtraProps;
}

export function ViewHandler<
  TData,
  TUpdateData = any,
  TResponse = any,
  TViewExtraProps = any,
  TFormExtraProps = any
>({
  queryKey,
  queryFn,
  mutationFns,
  params = { id: 0 },
  ViewComponent,
  FormComponent,
  viewProps,
  itemAction,
  onParentItemAction,
  formProps,
}: ViewHandlerProps<
  TData,
  TUpdateData,
  TResponse,
  TViewExtraProps,
  TFormExtraProps
>) {
  const queryClient = useQueryClient();
  const { confirm, dialogProps } = useConfirm();
  const [openView, setOpenView] = useState<boolean>(false);
  const [openForm, setOpenForm] = useState<boolean>(false);

  const { data, isLoading, error } = useApiQuery<TData, ListParamsWithId>(
    queryKey,
    queryFn,
    params
  );

  const mutationFn =
    params.id && mutationFns?.updateFn
      ? {
          fn: mutationFns.updateFn(params),
          s: mutationFns.onSuccess?.("updated"),
        }
      : mutationFns?.createFn
      ? {
          fn: mutationFns.createFn,
          s: mutationFns.onSuccess?.("created"),
        }
      : null;

  const deleteMutation = mutationFns?.deleteFn
    ? useApiMutation(mutationFns.deleteFn, {
        onSuccess: () => {
          mutationFns.onSuccess?.("deleted")();
          setTimeout(() => {
            toast.success("Deleted successfully!");
          }, 300);
        },
        onError: (error) => {
          setTimeout(() => {
            toast.success(error.message || "Deleted successfully!");
          }, 100);
        }
      })
    : null;

  const onMutationSuccess = (response: unknown) => {
    queryClient.invalidateQueries({
      queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
    });

    if (mutationFn?.s) {
      mutationFn.s(response as TResponse | MessageResponse);
    }
  };

  const handleDeleteItem = (itemName: string, id: number) => {
    confirm(
      `Delete ${itemName}`,
      `Are you sure you want to delete this ${itemName}?`,
      () => deleteMutation?.mutate(id),
      "destructive"
    );
  };

  const closeViewForm = () => {
    setOpenForm(false);
  };

  const onItemAction = ({ itemName, action, id }: ItemActionProps) => {
    switch (action) {
      case "delete":
        handleDeleteItem(itemName, id);
        break;
      case "create":
      case "edit":
        setOpenForm(true);
        break;
      case "view":
        setOpenView(true);
        break;
      default:
        setOpenForm(false);
        setOpenView(false);
        break;
    }

    if (onParentItemAction) onParentItemAction({ itemName, action, id });
  };

  useEffect(() => {
    if (itemAction) onItemAction(itemAction);
  }, [itemAction]);

  return (
    <>
      {ViewComponent && (
        <ViewComponent
          data={data || null}
          loading={isLoading}
          error={error?.message || null}
          onItemAction={onItemAction}
          open={openView}
          {...(viewProps as TViewExtraProps)}
        />
      )}

      {FormComponent && (
        <FormHandler<
          TUpdateData,
          TResponse,
          TFormExtraProps & TViewFormExtraProps<TData>
        >
          mutationFn={
            mutationFn
              ? mutationFn.fn
              : () => Promise.reject("No mutation function available")
          }
          FormComponent={FormComponent}
          formProps={{
            ...({
              open: openForm,
              closeForm: closeViewForm,
              values: data || null,
              isEditMode: !!params.id,
            } as TViewFormExtraProps<TData>),
            ...(formProps as TFormExtraProps),
          }}
          onSuccess={onMutationSuccess}
        />
      )}

      <ConfirmDialog {...dialogProps} />
    </>
  );
}
