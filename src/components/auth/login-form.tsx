import { useState } from "react";
import { z } from "zod";
import { Eye, EyeOff, Loader2, Mail } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useAppForm } from "@/components/ui/tanstack-form";
import { useInput } from "@/hooks/use-input";
import { FieldConfig } from "@/@types/feild.type";
import { toast } from "sonner";
import { SimpleForm } from "../form/simple-form";
import { FormBaseProps } from "../form-handler";
import { LoginData, LoginResponse } from "@/@types/auth.type";

const LoginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof LoginSchema>;

type LoginFormProps = FormBaseProps<LoginData, LoginResponse>;

export function LoginForm({
  handleSubmit,
  isSubmitting: loading,
  error,
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const fields: FieldConfig[] = [
    {
      id: "email",
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "username@example.com",
      startAdornment: <Mail className="h-4 w-4 text-gray-400" />,
      required: true,
    },
    {
      id: "password",
      name: "password",
      label: "Password",
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
      bottomAdornment: (
        <span className="flex justify-end mt-1">
          <Link to="/forgot-password" className="text-sm hover:underline">
            Forgot password?
          </Link>
        </span>
      ),
    },
  ];

  const form = useAppForm({
    validators: { onSubmit: LoginSchema },
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      try {
        await handleSubmit(value);
      } catch (err: any) {
        const message =
          typeof err === "string" ? err : err?.message || "Please try again";
        toast.error("Login failed: " + message);
      }
    },
  });

  const { inputs } = useInput({ fields, form, showRequiredAsterisk: true });

  return (
    <div className="space-y-15">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold uppercase">Login</h1>
        <p className="text-muted-foreground">
          Enter your email below to login to your account
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
            Login
          </Button>
        }
      >
        <div className="grid grid-cols-1 gap-4">{inputs}</div>
      </SimpleForm>
    </div>
  );
}
