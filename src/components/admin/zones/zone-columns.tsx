
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { SquarePen, Trash2 } from "lucide-react";
import { Zone} from "@/@types/zone.type";
import { ReactNode, useState } from "react";
import { Switch } from "@/components/ui/switch";
export const columns = (
  handleDelete: (ZoneId: number) => void,
  handleEdit: (ZoneId: number) => void,
  // handleView: (Zone: Zone) => void,
  // extraActions: (Zone: Zone) => ReactNode
): ColumnDef<Zone>[] => [
  {
    accessorKey: 'name',
    header: 'NAME',
  },
  {
    accessorKey: 'location',
    header: 'LOCATION',
  },
  {
    header: "ACTIONS",
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const Zone = row.original;

      return (
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" 
          onClick={() => handleEdit(Zone.id)}
          >
            <SquarePen className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDelete(Zone.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
