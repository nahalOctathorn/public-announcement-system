import { useState } from "react";
import { z } from "zod";
import { Eye, EyeOff, Loader2, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useAppForm } from "@/components/ui/tanstack-form";
import { useInput } from "@/hooks/use-input";
import { FieldConfig } from "@/@types/feild.type";
import { toast } from "sonner";
import { CardForm } from "../form/card-form";
import { SimpleForm } from "../form/simple-form";
import { RegisterData } from "@/@types/auth.type";
import { FormBaseProps } from "../form-handler";

const SignUpSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpFormValues = z.infer<typeof SignUpSchema>;

type SignUpFormProps = FormBaseProps<RegisterData, any>;

export function SignUpForm({ handleSubmit, isSubmitting: loading, error }: SignUpFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const fields: FieldConfig[] = [
    {
      id: "firstName",
      name: "firstName",
      label: "First Name",
      type: "text",
      placeholder: "John",
      required: true,
      startAdornment: <User className="h-4 w-4 text-gray-400" />,
    },
    {
      id: "lastName",
      name: "lastName",
      label: "Last Name",
      type: "text",
      placeholder: "Doe",
      required: true,
      startAdornment: <User className="h-4 w-4 text-gray-400" />,
    },
    {
      id: "email",
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "username@example.com",
      required: true,
      startAdornment: <Mail className="h-4 w-4 text-gray-400" />,
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
    validators: { onSubmit: SignUpSchema },
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      const { confirmPassword, ...submitValues } = value;

      try {
        await handleSubmit(submitValues);
        toast.success("Account created successfully");
      } catch (err: any) {
        const message =
          typeof err === "string" ? err : err?.message || "Please try again";
        toast.error("Sign up failed: " + message);
      }
    },
  });

  const { inputs } = useInput({
    fields,
    form,
    showRequiredAsterisk: true,
  });

  return (
    <div className="space-y-15">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold uppercase">Sign Up</h1>
        <p className="text-muted-foreground">
          Create your account to get started
        </p>
      </div>

      <SimpleForm
        form={form}
        loading={loading}
        error={error}
        buttons={
          <Button type="submit" variant="bluish" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign Up
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
