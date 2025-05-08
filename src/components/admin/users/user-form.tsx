import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useInput } from "@/hooks/use-input";
import { useAppForm } from "@/components/ui/tanstack-form";
import { toast } from "sonner";
import {
  UserFormSchema,
  useUserFormFields,
} from "@/hooks/use-user-form-fields";
import { ModalForm } from "@/components/form/modal-form";
import {
  UserData,
  UserWithProfile,
  UserWithProfileAndPassword,
} from "@/@types/user.type";
import { MessageResponse } from "@/@types/general.type";
import { FormBaseProps } from "@/components/form-handler";


type UserFormProps = FormBaseProps<UserData, UserWithProfileAndPassword> & {
  open: boolean;
  closeForm: () => void;
  values?: UserWithProfile;
  isEditMode?: boolean;
};

export function UserForm({
  handleSubmit,
  isSubmitting,
  error,
  open,
  closeForm,
  values,
  isEditMode = false,
}: UserFormProps) {

  const { fields, defaultValues } = useUserFormFields();

  const formDefaultValues = values
    ? {
        ...defaultValues,
        ...Object.fromEntries(
          Object.entries(values).filter(([key]) => key in defaultValues)
        ),
        ...(values.profile
          ? Object.fromEntries(
              Object.entries(values.profile).filter(
                ([key]) => key in defaultValues
              )
            )
          : {}),
      }
    : {
        ...defaultValues,
      };

  const form = useAppForm({
    validators: { onSubmit: UserFormSchema },
    defaultValues: formDefaultValues,
    onSubmit: async ({ value }) => {
      try {
      
        const res = await handleSubmit(value);

        const { message } = res as MessageResponse;

        toast.success(
          message ||
            `User ${
              isEditMode ? "updated" : "added"
            } successfully`
        );
      } catch (err: any) {
        const message =
          typeof err === "string" ? err : err?.message || "Please try again";
        toast.error(
          `Error ${isEditMode ? "updating" : "adding"} user: ${message}`
        );
      }
    },
  });

  const { inputs } = useInput({
    fields,
    form,
  });

  const closeUserForm = () => {
    closeForm();
    form.reset();
  };

  const onOpenChange = (state: boolean) => {
    if (state === false) closeUserForm();
  };

  return (
    <>
      <ModalForm
        title={`${isEditMode ? "Edit" : "Add"} User`}
        description={`${isEditMode ? "Edit" : "Add a new"} user`}
        form={form}
        loading={isSubmitting}
        error={error}
        open={open}
        onOpenChange={onOpenChange}
        width="4xl"
        buttons={
          <>
            <Button
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                closeUserForm();
              }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isEditMode ? "Update" : "Add"}
            </Button>
          </>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {inputs}
        </div>
      </ModalForm>

    </>
  );
}
