import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { PUBLIC_ROUTES } from "@/config/routes.config";
import { Suspense } from "react";
import { AppLoader } from "@/components/layout/app-loader";

export default function PrivateRoute() {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <AppLoader />;

  // if (!user) {
  //   return (
  //     <Navigate to={PUBLIC_ROUTES.LOGIN} state={{ from: location }} replace />
  //   );
  // }

  return (
    <Suspense fallback={<AppLoader />}>
      <Outlet />
    </Suspense>
  );
}
