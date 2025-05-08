import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { columns } from "./audio-columns";
import { TableDateFilter } from "@/components/table/table-date-filter";
import { Audio } from "@/@types/audio.type";

import { useNavigate } from "react-router-dom";
import {
  Filter,
  Plus,
  XIcon,
} from "lucide-react";
import { CardTable } from "@/components/table/card-table";
import { TableBaseProps } from "@/components/layout/app-table";
import { ItemActionProps } from "@/@types/general.type";

interface AudioTableProps extends TableBaseProps<Audio> {
  data: Audio[];
  loading: boolean;
  error: string | null;
  onFilterChange: (filters: Record<string, any>) => void;
  setItemAction: ({ itemName, action, id }: ItemActionProps) => void;

}


export function AudioTable({
  data,
  loading,
  error,
  pagination,
  onPageChange,
  onLimitChange,
  onFilterChange,
  setItemAction,
}: AudioTableProps) {
  const [filters, setFilters] = useState<Record<string, any>>({});

const handleDelete = (AudioId: number) => {
    setItemAction({ itemName: "Audio", id: AudioId, action: "delete" });
  };

  const handleEdit = (AudioId: number) => {
    setItemAction({ itemName: "Audio", id: AudioId, action: "edit" });
  };

  return (
    <CardTable<Audio>
      loading={loading}
      error={error}
      columns={columns(handleDelete, handleEdit)}
      data={data}
      renderToolbar={(table) => (
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-2">
          <h1 className="text-md font-bold">All Audios</h1>
          <Button className="bg-primary text-white px-4 py-2"
          onClick={() =>
            setItemAction({ itemName: "Audio", action: "create", id: 0 })
          }
          >
            + Add More
          </Button>

        </div>
      )}
      emptyMessage="No Audios found."
      pagination={pagination}
      onPageChange={onPageChange}
      onLimitChange={onLimitChange}
    />
  );
}
