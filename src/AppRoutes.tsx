import {
  PUBLIC_ROUTES,
  ADMIN_ROUTES,
  COMMON_ROUTES,
  ROOT_ROUTE,
} from "@/config/routes.config";
import {
  LoginPage,
  ResetPassword,
  SendResetLink,
  Dashboard,
  Devices,
  Schedule,
  SosAlerts,
  Announcements,
  ZonesLocations,
  NotFound,
} from "@/pages";
import {
  MainLayout,
  DashboardLayoutWrapper,
  AuthLayout,
} from "@/layouts";
import { PrivateRoute, PublicRoute } from "@/routes";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Audios from "./pages/admin/audios";

const appRouter = createBrowserRouter([
  {
    path: ROOT_ROUTE,
    element: <MainLayout />,
    children: [
      {
        element: <PublicRoute />,
        children: [
          {
            element: <AuthLayout />,
            children: [
              {
                path: PUBLIC_ROUTES.LOGIN,
                element: <LoginPage />,
              },
              {
                path: PUBLIC_ROUTES.RESET_PASSWORD,
                element: <ResetPassword />,
              },
              {
                path: PUBLIC_ROUTES.FORGOT_PASSWORD,
                element: <SendResetLink />,
              },
            ],
          },
        ],
      },
      {
        element: <PrivateRoute />,

        children: [
          {
            index: true,
            element: <Navigate to={ADMIN_ROUTES.DASHBOARD} replace />,
          },
          {
            element: <DashboardLayoutWrapper />,
            children: [
              {
                path: ADMIN_ROUTES.DASHBOARD,
                element: <Dashboard />,
              },
              {
                path: ADMIN_ROUTES.DEVICES,
                element: <Devices/>,
              },
              {
                path: ADMIN_ROUTES.SCHEDULE,
                element: <Schedule />,
              },
              {
                path: ADMIN_ROUTES.SOS_ALERTS,
                element: <SosAlerts />,
              },
              {
                path: ADMIN_ROUTES.ANNOUNCEMENTS,
                element: <Announcements />,
              },
              {
                path: ADMIN_ROUTES.ZONES_LOCATIONS,
                element: <ZonesLocations />,
              },
              {
                path: ADMIN_ROUTES.AUDIOS,
                element: <Audios />,
              },
            ],
          },
          // Common authenticated routes

          // 404 route
          {
            path: COMMON_ROUTES.NOT_FOUND,
            element: <NotFound />,
          },
        ],
      },
    ],
  },
]);

export default appRouter;