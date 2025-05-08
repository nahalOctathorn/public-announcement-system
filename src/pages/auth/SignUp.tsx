import { useNavigate } from "react-router-dom";
import { SignUpForm } from "@/components/auth/signup-form";
import { FormHandler } from "@/components/form-handler";
import { RegisterData } from "@/@types/auth.type";
import { register } from "@/services/auth.api";
import { buildRoutePath } from "@/lib/utils";
import { PUBLIC_ROUTES } from "@/config/routes.config";

export default function SignUp() {
  const navigate = useNavigate();

  const LoginPath = buildRoutePath(PUBLIC_ROUTES.LOGIN);

  return (
    <FormHandler<RegisterData, any>
      mutationFn={register}
      FormComponent={SignUpForm}
      onSuccess={() => {
        navigate(LoginPath);
      }}
    />
  );
}
