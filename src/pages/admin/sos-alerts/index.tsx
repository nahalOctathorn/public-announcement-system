import { useAuth } from "@/hooks/use-auth";
import PageInnerLayout from "@/layouts/PageInnerLayout";
import { Navigate, Outlet } from "react-router-dom";
import { PUBLIC_ROUTES } from "@/config/routes.config";

export default function SosAlerts() {
  const { user } = useAuth();
  // if (!user) return <Navigate to={PUBLIC_ROUTES.LOGIN} replace />;
  return (
    <PageInnerLayout Header={<Header />}>
      <Outlet />
    </PageInnerLayout>
  );
}

const Header = () => (
  Header 
);
