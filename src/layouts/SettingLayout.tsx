import { ReactNode } from "react";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import stimLogo from "@/assets/stim-logo.svg";
import { AppHeader2 } from "@/components/layout/app-header2";
import { Outlet, useLocation } from "react-router-dom";
import { AuthUser } from "@/@types/auth.type";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface SettingLayoutProps {
  children: ReactNode;
  title: string;
  user: AuthUser;
}

const routeTitles: Record<string, string> = {
  "/profile": "Profile",
  "/settings": "Settings",
};

export default function SettingsLayout({
  children,
  title = "Settings",
  user,
}: SettingLayoutProps) {
  const userName = user?.firstName;
  const email = user?.email;

  return (
    <SidebarProvider>

      <AppSidebar
        variant="inset"
        logoSrc={stimLogo}
        className="p-0"
        themeClass="dark" />


      <SidebarInset
        className="light w-100"
        style={{
          background: "var(--background)",
          color: "var(--foreground)",
        }}
      >
        <AppHeader2 title={title} />
        <div className="mx-2 lg:mx-10 -mt-16 z-10">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={""} alt={userName} />
                  <AvatarFallback className="rounded-lg">
                    {userName?.substring(0, 2).toLocaleUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{userName}</span>
                  <span className="text-xs text-muted-foreground">{email}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative">{children}</CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export function SettingLayoutWrapper() {
  const location = useLocation();
  const { user } = useAuth();
  const title = routeTitles[location.pathname] || "N/A";

  return (
    <SettingsLayout title={title} user={user as AuthUser}>
      <Outlet />
    </SettingsLayout>
  );
}
