import { LoginData } from "@/@types/auth.type";
import { LoginForm } from "@/components/auth/login-form";
import { FormHandler } from "@/components/form-handler";
import { useAuth } from "@/hooks/use-auth";

export default function Login() {
  const { login } = useAuth();
  return (
    <FormHandler<LoginData, void>
      mutationFn={login}
      FormComponent={LoginForm}
    />
  );
}
