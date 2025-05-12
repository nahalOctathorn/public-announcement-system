import { AlarmClock, CalendarCheck2, MapPin, Play, Radio, Siren, Smartphone } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";

import {
  LayoutDashboard,
  SettingsIcon,
  UserIcon,
  type LucideIcon,
} from "lucide-react";
import { matchRoutePath } from "@/lib/utils";
import {
  ADMIN_ROUTES,
  COMMON_ROUTES,
} from "@/config/routes.config";

const navItems: {
  title: string;
  icon?: LucideIcon;
  urls: string[];
}[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    urls: [
      ADMIN_ROUTES.DASHBOARD,
    ],
  },
  {
    title: "Devices",
    icon: Smartphone,
    urls: [
      ADMIN_ROUTES.DEVICES,
    ],
  },
  {
    title: " Schedule",
    urls: [ADMIN_ROUTES.SCHEDULE],
    icon: CalendarCheck2,
  },
  {
    title: "SOS Alerts",
    urls: [ADMIN_ROUTES.SOS_ALERTS],
    icon: Siren,
  },
  {
    title: "Announcements",
    urls: [ADMIN_ROUTES.ANNOUNCEMENTS],
    icon: Radio,
  },
  {
    title: "Zones / Locations",
    urls: [ADMIN_ROUTES.ZONES_LOCATIONS],
    icon: MapPin,
  },
  {
    title: "Audios",
    urls: [ADMIN_ROUTES.AUDIOS],
    icon: Play,
  },
{
    title: "Prayer",
    urls: [ADMIN_ROUTES.Prayer],
    icon: AlarmClock,
  },

  ];

export function NavMain() {
  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <Link to={item.urls[0]}>
                <SidebarMenuButton
                  isActive={item.urls?.some((url) =>
                    matchRoutePath(url, location.pathname)
                  )}
                  tooltip={item.title}
                  className="hover:border-l-4 hover:border-primary hover:bg-primary/10 data-[active=true]:bg-primary/10 data-[active=true]:border-l-4 data-[active=true]:border-primary"
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
