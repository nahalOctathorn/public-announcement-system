import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { AuthUser } from "@/@types/auth.type";
import { MobileUserDropdown } from "../nav/nav-user";
import nastpLogo from "@/assets/alpha-logo 1.png"
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import AppSearch from "./app-search";


interface AppHeaderProps {
  title: string;
  user: AuthUser;
}

export function AppHeader({ title, user }: AppHeaderProps) {
  const userName = user?.firstName;
  const email = user?.email;

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-20 flex h-20 shrink-0 items-center gap-2 transition-[width,height] ease-linear">
      <div className="flex w-full items-center justify-between gap-1 px-4 lg:gap-2 lg:px-6">
        <div className="flex w-full items-center gap-1">
          <SidebarTrigger className="-ml-1 block md:hidden" />
          <h1 className="text-lg md:text-2xl font-semibold">{title}</h1>
        </div>
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
         <AppSearch SearchItem="Search..."/>
          <Avatar className="h-6 w-6 sm:h-10 sm:w-10 rounded-lg ">
            <AvatarImage src={nastpLogo} alt={userName} />
            <AvatarFallback className="rounded-xxl bg-blue/10">
              {userName?.substring(0, 2).toLocaleUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="hidden sm:grid flex-1 text-left text-sm leading-tight">
            <span className=" font-semibold text-nowrap ">NASTP Member</span>
            <span className="text-sm text-muted-foreground">Admin</span>
          </div>
          <div className="sm:hidden flex-1 flex items-center justify-between">
            <MobileUserDropdown userName={userName} email={email} />
          </div>
        </div>
      </div>
    </header>
  );
}
