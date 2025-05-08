import { ReactNode } from "react";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppHeader } from "@/components/layout/app-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import nastpLogo from "@/assets/nastp-logo 3.png";
import { AuthUser } from "@/@types/auth.type";
import { useAuth } from "@/hooks/use-auth";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import { matchRoutePath } from "@/lib/utils";
import {
  ADMIN_ROUTES,
} from "@/config/routes.config";

interface DashboardLayoutProps {
  children: ReactNode;
  user: AuthUser;
}

const ROUTE_TITLES: Record<string, string> = {
  [ADMIN_ROUTES.DASHBOARD]: "Dashboard",
  [ADMIN_ROUTES.DEVICES]:"Devices",
  [ADMIN_ROUTES.SOS_ALERTS]: "SOS Alerts",
  [ADMIN_ROUTES.ZONES_LOCATIONS]:"Zones / Locations",
  [ADMIN_ROUTES.SCHEDULE]:"Schedule",
  [ADMIN_ROUTES.ANNOUNCEMENTS]:"Announcement",

  
};

export default function DashboardLayout({
  children,
  user,
}: DashboardLayoutProps) {
  const location = useLocation();

  const getRouteTitle = () => {
    if (ROUTE_TITLES[location.pathname]) {
      return ROUTE_TITLES[location.pathname];
    }

    for (const [pattern, title] of Object.entries(ROUTE_TITLES)) {
      if (pattern.includes(":") && matchRoutePath(pattern, location.pathname)) {
        return title;
      }
    }

    return "Dashboard";
  };

  const title = getRouteTitle();

  return (
    <SidebarProvider>
      <AppSidebar
        variant="inset"
        logoSrc={nastpLogo}
        className="p-0"
        themeClass="dark"
      />
      <SidebarInset
        className="light w-100"
        style={{
          background: "var(--background)",
          color: "var(--foreground)",
        }}
      >
        <AppHeader title={title} user={user} />
        <div className="flex flex-1 flex-col p-4 lg:px-6">
          <div className="@container/main flex flex-1 flex-col gap-2">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export function DashboardLayoutWrapper() {
  const { user } = useAuth();

  // if (!user) {
  //   return <Navigate to="/login" replace />;
  // }

  return (
     
    <DashboardLayout user={user as AuthUser} >
        <Outlet />
    </DashboardLayout>
     
  );
}
