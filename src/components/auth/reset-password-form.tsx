import { z } from "zod";
import { useAppForm } from "@/components/ui/tanstack-form";
import { useInput } from "@/hooks/use-input";
import { FieldConfig } from "@/@types/feild.type";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";
import { CardForm } from "../form/card-form";
import { SimpleForm } from "../form/simple-form";
import { MessageResponse } from "@/@types/general.type";
import { FormBaseProps } from "../form-handler";
import { ResetPasswordData } from "@/@types/auth.type";

const ResetPasswordSchema = z
  .object({
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordValues = z.infer<typeof ResetPasswordSchema>;

type ResetPasswordFormProps = FormBaseProps<
  ResetPasswordData,
  MessageResponse
> & {
  token?: string;
};

export function ResetPasswordForm({
  handleSubmit,
  isSubmitting: loading,
  error,
  token,
}: ResetPasswordFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const fields: FieldConfig[] = [
    {
      id: "newPassword",
      name: "newPassword",
      label: "New Password",
      type: showPassword ? "text" : "password",
      required: true,
      endAdornment: (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      ),
    },
    {
      id: "confirmPassword",
      name: "confirmPassword",
      label: "Confirm Password",
      type: showConfirmPassword ? "text" : "password",
      required: true,
      endAdornment: (
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          {showConfirmPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      ),
    },
  ];

  const form = useAppForm({
    validators: { onSubmit: ResetPasswordSchema },
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      if (!token) {
        toast.error("Token is required");
        return;
      }

      try {
        const res = await handleSubmit({
          newPassword: value.newPassword,
          token,
        });

        const { message } = res as MessageResponse;

        toast.success(message || "Password reset successfully");
      } catch (err: any) {
        const message =
          typeof err === "string" ? err : err?.message || "Please try again";
        toast.error("Failed to reset password: " + message);
      }
    },
  });

  const { inputs } = useInput({ fields, form, showRequiredAsterisk: true });

  return (
    <div className="space-y-15">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold uppercase">Reset Password</h1>
        <p className="text-muted-foreground">
          Create a new password for your account
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
            Reset Password
          </Button>
        }
      >
        <div className="grid grid-cols-1 gap-6">{inputs}</div>
      </SimpleForm>

      <>
        Already have an account?{" "}
        <Link to="/login" className="underline underline-offset-4">
          Login
        </Link>
      </>
    </div>
  );
}
