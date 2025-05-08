import React, { useState } from "react";
import { PaginatedResponse, ListParamsWithId } from "@/@types/api.type";
import { usePaginatedQuery } from "@/hooks/use-api-paginated-query";
import { useQueryClient } from "@tanstack/react-query";
import { FormBaseProps } from "./form-handler";
import { ItemActionProps, MessageResponse } from "@/@types/general.type";
import {
  MutationFns,
  TViewFormExtraProps,
  ViewBaseProps,
  ViewHandler,
} from "./view-handler";

interface TableBaseProps<TData> {
  data: TData[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    lastPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  onFilterChange: (filters: Record<string, any>) => void;
  setItemAction: ({ itemName, action, id }: ItemActionProps) => void;
}

export interface IExtraComponentProps {
  itemAction: ItemActionProps | null;
  setItemAction: (ItemAction: ItemActionProps | null) => void;
}

export interface IExtraComponent<TTableExtraProps = any> {
  trigerAction: string;
  comp: React.ComponentType<IExtraComponentProps & TTableExtraProps>;
}

interface ExtraComponentRendererProps<TTableExtraProps> {
  extraComponents?: IExtraComponent<TTableExtraProps>[];
  itemAction: ItemActionProps | null;
  setItemAction: React.Dispatch<React.SetStateAction<ItemActionProps | null>>;
  tableProps: TTableExtraProps;
}

const useExtraComponentsMap = <TTableExtraProps,>(
  components: IExtraComponent<TTableExtraProps>[] | undefined
) => {


  return React.useMemo(() => {
    if (!components) return null;

    return components.reduce((acc, extra) => {
      acc[extra.trigerAction] = extra.comp;
      return acc;
    }, {} as Record<string, React.ComponentType<IExtraComponentProps & TTableExtraProps>>);
  }, [components]);
};

const ExtraComponentHandler = <TTableExtraProps,>({
  extraComponents,
  itemAction,
  setItemAction,
  tableProps,
}: ExtraComponentRendererProps<TTableExtraProps>) => {
  const extraComponentsMap = useExtraComponentsMap(extraComponents);
  const currentAction = itemAction?.action;



  return React.useMemo(() => {
    if (!currentAction || !extraComponentsMap) return null;

    const ExtraComp = extraComponentsMap[currentAction];


    if (!ExtraComp) return null;

    return (
      <ExtraComp
        key={`extra-comp-${currentAction}`}
        itemAction={itemAction}
        setItemAction={setItemAction}
        {...tableProps}
      />
    );
  }, [
    currentAction,
    extraComponentsMap,
    itemAction,
    setItemAction,
    tableProps,
  ]);
};

type TableHandlerProps<
  TData,
  TFormData,
  TResponse,
  TTableExtraProps,
  TFormExtraProps,
  TViewExtraProps
> = {
  queryKey: string | any[];
  queryFn: (params: {
    page: number;
    limit: number;
    search?: string;
    filters?: Record<string, any>;
  }) => Promise<PaginatedResponse<TData>>;
  TableComponent: React.ComponentType<TableBaseProps<TData> & TTableExtraProps>;
  FormComponent?: React.ComponentType<
    FormBaseProps<TFormData, TResponse> & TFormExtraProps
  >;
  ViewComponent?: React.ComponentType<ViewBaseProps<TData> & TViewExtraProps>;
  extraComponents?: IExtraComponent<TTableExtraProps>[];
  queryKeySingle?: string | any[];
  queryFnSingle?: (params: ListParamsWithId) => Promise<TData>;
  mutationFns?: MutationFns<TFormData, TResponse>;
  tableProps?: TTableExtraProps;
  formProps?: TFormExtraProps;
  viewProps?: TViewExtraProps;
  initialPage?: number;
  initialLimit?: number;
  initialFilters?: Record<string, any>;
};

export function TableHandler<
  TData,
  TFormData = any,
  TResponse = any,
  TTableExtraProps = any,
  TFormExtraProps = any,
  TViewExtraProps = any
>({
  queryKey,
  queryFnSingle,
  queryFn,
  mutationFns,
  TableComponent,
  FormComponent,
  ViewComponent,
  initialPage = 1,
  initialLimit = 10,
  initialFilters = {},
  tableProps,
  formProps,
  viewProps,
  extraComponents,
}: TableHandlerProps<
  TData,
  TFormData,
  TResponse,
  TTableExtraProps,
  TFormExtraProps,
  TViewExtraProps
>) {
  const queryClient = useQueryClient();
  const [itemAction, setItemAction] = useState<ItemActionProps | null>(null);

  const { data, isLoading, error, pagination, setPage, setLimit, setFilters } =
    usePaginatedQuery<TData>(queryKey, queryFn, {
      page: initialPage,
      limit: initialLimit,
      filters: initialFilters,
    });

  const onMutationSuccess = (response: unknown) => {
    queryClient.invalidateQueries({
      queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
    });
  };


  return (
    <>
      <TableComponent
        data={data?.data || []}
        loading={isLoading}
        error={error?.message || null}
        pagination={pagination}
        onPageChange={setPage}
        onLimitChange={setLimit}
        onFilterChange={setFilters}
        setItemAction={setItemAction}
        {...(tableProps as TTableExtraProps)}
      />

      <ViewHandler<
        TData,
        TFormData,
        TResponse,
        TViewExtraProps,
        TFormExtraProps & any
      >
        params={{ id: itemAction?.id || 0 }}
        queryKey={[(queryKey || "no") + "_item", itemAction?.id || 0]}
        queryFn={
          queryFnSingle && itemAction?.id
            ? queryFnSingle
            : () => Promise.reject("No query function available")
        }
        ViewComponent={ViewComponent}
        FormComponent={FormComponent}
        mutationFns={
          mutationFns
            ? {
                ...mutationFns,
                onSuccess: (action: string) => (res: unknown) => {
                  if (action === "created") onMutationSuccess(res);

                  if (mutationFns.onSuccess) {
                    mutationFns.onSuccess(action)(
                      res as TResponse | MessageResponse | void
                    );
                  }
                },
              }
            : mutationFns
        }
        itemAction={itemAction}
        formProps={formProps as TFormExtraProps}
        viewProps={viewProps as TViewExtraProps}
      />




      <ExtraComponentHandler
        extraComponents={extraComponents}
        itemAction={itemAction}
        setItemAction={setItemAction}
        tableProps={tableProps}
      />
    </>
  );
}
