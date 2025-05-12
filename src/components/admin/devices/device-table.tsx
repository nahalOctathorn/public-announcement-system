import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { columns } from "./device-columns";
import { TableDateFilter } from "@/components/table/table-date-filter";
import { Device } from "@/@types/device.type";

import { useNavigate } from "react-router-dom";
import {
  Filter,
  Plus,
  XIcon,
} from "lucide-react";
import { CardTable } from "@/components/table/card-table";
import { TableBaseProps } from "@/components/layout/app-table";
import { ItemActionProps } from "@/@types/general.type";

interface DeviceTableProps extends TableBaseProps<Device> {
  data: Device[];
  loading: boolean;
  error: string | null;
  onFilterChange: (filters: Record<string, any>) => void;
  setItemAction: ({ itemName, action, id }: ItemActionProps) => void;

}


export function DeviceTable({
  data,
  loading,
  error,
  pagination,
  onPageChange,
  onLimitChange,
  onFilterChange,
  setItemAction,
}: DeviceTableProps) {
  const [filters, setFilters] = useState<Record<string, any>>({});

const handleDelete = (DeviceId: number) => {
    setItemAction({ itemName: "Device", id: DeviceId, action: "delete" });
  };

  const handleEdit = (DeviceId: number) => {
    setItemAction({ itemName: "Device", id: DeviceId, action: "edit" });
  };
  return (
    <CardTable<Device>
      loading={loading}
      error={error}
      columns={columns(handleDelete, handleEdit)}
      data={data}
      renderToolbar={(table) => (
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-2">
          <h1 className="text-md font-bold">All Devices</h1>
          <Button className="bg-primary text-white px-4 py-2"
          onClick={() =>
            setItemAction({ itemName: "Device", action: "create", id: 0 })
          }
          >
            + Add More
          </Button>

        </div>
      )}
      emptyMessage="No Devices found."
      pagination={pagination}
      onPageChange={onPageChange}
      onLimitChange={onLimitChange}
    />
  );
}
