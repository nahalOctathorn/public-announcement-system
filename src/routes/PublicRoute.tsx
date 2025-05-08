import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { ADMIN_ROUTES } from "@/config/routes.config";
import { Suspense } from "react";
import { AppLoader } from "@/components/layout/app-loader";

export default function PublicRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <AppLoader />;

  // if (user) {
  //   return <Navigate to={ADMIN_ROUTES.DASHBOARD} replace />;
  // }

  return (
    <Suspense fallback={<AppLoader />}>
      <Outlet />
    </Suspense>
  );
}
