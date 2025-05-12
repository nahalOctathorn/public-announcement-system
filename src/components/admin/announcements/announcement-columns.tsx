
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { SquarePen, Trash2 } from "lucide-react";
import { Announcement, AnnouncementStatus } from "@/@types/announcement.type";
import { ReactNode, useState } from "react";
import { Switch } from "@/components/ui/switch";
import AudioWaveform from "@/components/dashboard/audio-waver";
import PlayButton from "@/components/dashboard/play-button";
export const columns = (
  handleDelete: (AnnouncementId: number) => void,
  handleEdit: (AnnouncementId: number) => void,
  // handleView: (Announcement: Announcement) => void,
  // extraActions: (Announcement: Announcement) => ReactNode
): ColumnDef<Announcement>[] => [
    {
      accessorKey: 'name',
      header: 'SUBJECT',
    },
    {
      accessorKey: 'description',
      header: 'TEXT POST',
    },
    {
      accessorKey: 'devices',
      header: 'DEVICES',
      cell: ({ row }) => {
        const devices = row.original.devices;
        return `${devices.length} devices`;
      }
    },
    {
      accessorKey: 'audio.filePath',
      header: 'SOUNDS FILE',
      cell: ({ row }) => {
        const file = row.original.audio;
        console.log("file", file);
        return (
          <div className="flex flex-row items-center gap-4">
            <div>
              <PlayButton />
            </div>
            <AudioWaveform />
          </div>
        );
      },
    },
    // {
    //   accessorKey: 'devices.zone.name',
    //   header: 'ZONE',
    // },
    // {
    //   accessorKey: 'status',
    //   header: 'STATUS',
    //   cell: ({ row }) => {
    //     const initialStatus = row.original.status;
    //     const [status, setStatus] = useState(initialStatus);

    //     const isOnline = status === AnnouncementStatus.ONLINE;

    //     return (
    //       <div className="flex items-center gap-2">
    //         <Switch
    //           className="hover:cursor-pointer"
    //           checked={isOnline}
    //           onCheckedChange={(checked) => {
    //             const newStatus = checked ? AnnouncementStatus.ONLINE : AnnouncementStatus.OFFLINE;
    //             setStatus(newStatus);

    //             // You can call your API/mutation here
    //             console.log(`Status: ${newStatus}`);
    //           }}
    //         />
    //       </div>
    //     );
    //   },
    // },
    {
      header: "ACTIONS",
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const Announcement = row.original;

        return (
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm"
              onClick={() => handleEdit(Announcement.id)}
            >
              <SquarePen className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDelete(Announcement.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];
