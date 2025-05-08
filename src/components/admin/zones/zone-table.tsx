import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { columns } from "./zone-columns";
import { TableDateFilter } from "@/components/table/table-date-filter";
import { Zone } from "@/@types/zone.type";

import { useNavigate } from "react-router-dom";
import {
  Filter,
  Plus,
  XIcon,
} from "lucide-react";
import { CardTable } from "@/components/table/card-table";
import { TableBaseProps } from "@/components/layout/app-table";
import { ItemActionProps } from "@/@types/general.type";

interface ZoneTableProps extends TableBaseProps<Zone> {
  data: Zone[];
  loading: boolean;
  error: string | null;
  onFilterChange: (filters: Record<string, any>) => void;
  setItemAction: ({ itemName, action, id }: ItemActionProps) => void;

}


export function ZoneTable({
  data,
  loading,
  error,
  pagination,
  onPageChange,
  onLimitChange,
  onFilterChange,
  setItemAction,
}: ZoneTableProps) {
  const [filters, setFilters] = useState<Record<string, any>>({});

  const handleDelete = (ZoneId: number) => {
    setItemAction({ itemName: "Zone", id: ZoneId, action: "delete" });
  };
  
  const handleEdit = (ZoneId: number) => {
    setItemAction({ itemName: "Zone", id: ZoneId, action: "edit" });
  };
  return (
    <CardTable<Zone>
      loading={loading}
      error={error}
      columns={columns(handleDelete, handleEdit)}
      data={data}
      renderToolbar={(table) => (
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-2">
          <h1 className="text-md font-bold">All Zones</h1>
          <Button className="bg-primary text-white px-4 py-2"
          onClick={() =>
            setItemAction({ itemName: "Zone", action: "create", id: 0 })
          }
          >
            + Add More
          </Button>

        </div>
      )}
      emptyMessage="No Zones found."
      pagination={pagination}
      onPageChange={onPageChange}
      onLimitChange={onLimitChange}
    />
  );
}
