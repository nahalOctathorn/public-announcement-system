import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Siren, ChevronDown } from "lucide-react";

export function TypeButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 px-4 py-2">
          <Siren size={16} className=" text-blue" />
          <span className="text-sm font-medium">Type</span>
          <ChevronDown className="w-4 h-4 ml-auto" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-40">
        <DropdownMenuItem>Urgent</DropdownMenuItem>
        <DropdownMenuItem>Warning</DropdownMenuItem>
        <DropdownMenuItem>Info</DropdownMenuItem>
        <DropdownMenuItem>Success</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
