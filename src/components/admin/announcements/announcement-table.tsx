import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { columns } from "./announcement-columns";
import { TableDateFilter } from "@/components/table/table-date-filter";
import { Announcement } from "@/@types/announcement.type";

import { useNavigate } from "react-router-dom";
import {
  Filter,
  Plus,
  XIcon,
} from "lucide-react";
import { CardTable } from "@/components/table/card-table";
import { TableBaseProps } from "@/components/layout/app-table";
import { ItemActionProps } from "@/@types/general.type";

interface AnnouncementTableProps extends TableBaseProps<Announcement> {
  data: Announcement[];
  loading: boolean;
  error: string | null;
  onFilterChange: (filters: Record<string, any>) => void;
  setItemAction: ({ itemName, action, id }: ItemActionProps) => void;

}


export function AnnouncementTable({
  data,
  loading,
  error,
  pagination,
  onPageChange,
  onLimitChange,
  onFilterChange,
  setItemAction,
}: AnnouncementTableProps) {
  const [filters, setFilters] = useState<Record<string, any>>({});

  const handleDelete = (AnnouncementId: number) => {
    setItemAction({ itemName: "Device", id: AnnouncementId, action: "delete" });
  };

  const handleEdit = (AnnouncementId: number) => {
    setItemAction({ itemName: "Device", id: AnnouncementId, action: "edit" });
  };
  return (
    <CardTable<Announcement>
      loading={loading}
      error={error}
       columns={columns(handleDelete, handleEdit)}
      data={data}
      renderToolbar={(table) => (
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-2">
          <h1 className="text-md font-bold">All Announcements</h1>
          <Button className="bg-primary text-white px-4 py-2"
          onClick={() =>
            setItemAction({ itemName: "Announcement", action: "create", id: 0 })
          }
          >
            + Add More
          </Button>

        </div>
      )}
      emptyMessage="No Announcements found."
      pagination={pagination}
      onPageChange={onPageChange}
      onLimitChange={onLimitChange}
    />
  );
}
