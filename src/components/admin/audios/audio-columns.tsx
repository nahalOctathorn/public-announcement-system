
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { SquarePen, Trash2 } from "lucide-react";
import { Audio} from "@/@types/audio.type";
import { ReactNode, useState } from "react";
import { Switch } from "@/components/ui/switch";
export const columns = (
  handleDelete: (AudioId: number) => void,
  handleEdit: (AudioId: number) => void,
  // handleView: (Audio: Audio) => void,
  // extraActions: (Audio: Audio) => ReactNode
): ColumnDef<Audio>[] => [
  {
    accessorKey: 'name',
    header: 'NAME',
  },
  {
    accessorKey: 'duration',
    header: 'DURATION',
  },
  {
    accessorKey: 'mimeType',
    header: 'MIME TYPE',
  },
  {
    header: "ACTIONS",
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const Audio = row.original;

      return (
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" 
          onClick={() => handleEdit(Audio.id)}
          >
            <SquarePen className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDelete(Audio.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
