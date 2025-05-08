import { MessageResponse } from "@/@types/general.type";
import { UserData, UserWithProfile } from "@/@types/user.type";
import { SimpleForm } from "@/components/form/simple-form";
import { Button } from "@/components/ui/button";
import { useAppForm } from "@/components/ui/tanstack-form";
import { useInput } from "@/hooks/use-input";
import {
  UserFormSchema,
  useUserFormFields,
} from "@/hooks/use-user-form-fields";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

type UserProfileFormProps = {
  handleSubmit: (values: UserData) => Promise<MessageResponse>;
  loading?: boolean;
  error?: string | null;
  data?: UserWithProfile;
};

export function UserProfileForm({
  handleSubmit,
  loading,
  error,
  data: values,
}: UserProfileFormProps) {
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
        const res = await handleSubmit(value as UserData);

        toast.success(res.message || "Profile updated successfully");
      } catch (err: any) {
        const message =
          typeof err === "string" ? err : err?.message || "Please try again";
        toast.error("Error updating profile: " + message);
      }
    },
  });

  const { inputs } = useInput({ fields, form, showRequiredAsterisk: true });

  return (
    <SimpleForm
      form={form}
      loading={loading}
      error={error}
      buttons={
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Update Profile
        </Button>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {inputs}
      </div>
    </SimpleForm>
  );
}
