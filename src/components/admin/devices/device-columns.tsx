
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { SquarePen, Trash2 } from "lucide-react";
import { Device,DeviceStatus } from "@/@types/device.type";
import { ReactNode, useState } from "react";
import { Switch } from "@/components/ui/switch";
export const columns = (
  handleDelete: (DeviceId: number) => void,
  handleEdit: (DeviceId: number) => void,
  // handleView: (Device: Device) => void,
  // extraActions: (Device: Device) => ReactNode
): ColumnDef<Device>[] => [
  {
    accessorKey: 'name',
    header: 'NAME',
  },
  {
    accessorKey: 'zone',
    header: 'ZONE/LOCATION',
  },
  {
    accessorKey: 'status',
    header: 'STATUS',
    cell: ({ row }) => {
      const initialStatus = row.original.status;
      const [status, setStatus] = useState(initialStatus);
  
      const isOnline = status === DeviceStatus.ONLINE;
  
      return (
        <div className="flex items-center gap-2">
          <Switch
          className="hover:cursor-pointer"
            checked={isOnline}
            onCheckedChange={(checked) => {
              const newStatus = checked ? DeviceStatus.ONLINE : DeviceStatus.OFFLINE;
              setStatus(newStatus);
  
              // You can call your API/mutation here
              console.log(`Status for ${row.original.name}: ${newStatus}`);
            }}
          />
        </div>
      );
    },
  },
  {
    header: "ACTIONS",
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const Device = row.original;

      return (
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" 
          onClick={() => handleEdit(Device.id)}
          >
            <SquarePen className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDelete(Device.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
