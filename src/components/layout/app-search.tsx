import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { ReactNode } from "react";

interface SearchProps {
  SearchItem: string | ReactNode
}
export default function AppSearch(SearchItem: SearchProps) {
  return (
    <div className="relative w-full ">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
      <Input
        placeholder={typeof SearchItem === "string" ? SearchItem : "search..."}
        className="pl-10 w-auto"
      />
    </div>
  )
}
