import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { FormHandler } from "@/components/form-handler";
import { resetPassword } from "@/services/auth.api";
import { ResetPasswordData } from "@/@types/auth.type";
import { MessageResponse } from "@/@types/general.type";
import { buildRoutePath } from "@/lib/utils";
import { PUBLIC_ROUTES } from "@/config/routes.config";

interface ResetPasswordFormExtraProps {
  token?: string;
}

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || undefined;

  const LoginPath = buildRoutePath(PUBLIC_ROUTES.LOGIN);

  useEffect(() => {
    if (!token) {
      navigate(LoginPath);
    }
  }, [token, navigate]);

  if (!token) return null;

  return (
    <FormHandler<
      ResetPasswordData,
      MessageResponse,
      ResetPasswordFormExtraProps
    >
      mutationFn={resetPassword}
      FormComponent={ResetPasswordForm}
      onSuccess={() => {
        navigate(LoginPath);
      }}
      formProps={{ token }}
    />
  );
}
