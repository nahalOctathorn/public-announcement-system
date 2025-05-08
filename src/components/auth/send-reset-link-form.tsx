import { z } from "zod";
import { useAppForm } from "@/components/ui/tanstack-form";
import { useInput } from "@/hooks/use-input";
import { FieldConfig } from "@/@types/feild.type";
import { Button } from "@/components/ui/button";
import { Loader2, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { SimpleForm } from "../form/simple-form";
import { MessageResponse } from "@/@types/general.type";
import { FormBaseProps } from "../form-handler";
import { SendResetLinkData } from "@/@types/auth.type";

const ResetLinkSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
});

type ResetLinkValues = z.infer<typeof ResetLinkSchema>;

type SendResetLinkFormProps = FormBaseProps<SendResetLinkData, MessageResponse>;

export function SendResetLinkForm({
  handleSubmit,
  isSubmitting: loading,
  error,
}: SendResetLinkFormProps) {
  const fields: FieldConfig[] = [
    {
      id: "email",
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "username@example.com",
      required: true,
      startAdornment: <Mail className="h-4 w-4 text-gray-400" />,
    },
  ];

  const form = useAppForm({
    validators: { onSubmit: ResetLinkSchema },
    defaultValues: {
      email: "",
    },
    onSubmit: async ({ value }) => {
      try {
        const res = await handleSubmit(value);

        const { message } = res as MessageResponse;

        toast.success(message || "Reset link sent successfully");
      } catch (err: any) {
        const message =
          typeof err === "string" ? err : err?.message || "Please try again";
        toast.error(
          "Failed to send reset link: " + message
        );
      }
    },
  });

  const { inputs } = useInput({ fields, form, showRequiredAsterisk: true });

  return (
    <div className="space-y-15">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold uppercase">Reset Your Password</h1>
        <p className="text-muted-foreground">
          Enter your email and we'll send you a link to reset your password
        </p>
      </div>

      <SimpleForm
        form={form}
        loading={loading}
        error={error}
        buttons={
          <Button
            type="submit"
            variant="bluish"
            className="w-full"
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Send Reset Link
          </Button>
        }
      >
        <div className="grid grid-cols-1 gap-6">{inputs}</div>
      </SimpleForm>

      <>
        Remember your password?{" "}
        <Link to="/login" className="underline underline-offset-4">
          Sign in
        </Link>
      </>
    </div>
  );
}
