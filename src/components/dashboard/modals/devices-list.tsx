import { Separator } from "@/components/ui/separator";
import StatusTabs from "../status-tabs";
import { Checkbox } from "@/components/ui/checkbox";


export default function DevicesList() {
    const devices = [
        {
            id: "1",
            name: "Main Entrance Speaker",
            status: "Active",
        },
        {
            id: "2",
            name: "Hallway Speaker",
            status: "Error",
        },
        {
            id: "3",
            name: "Office Intercom",
            status: "Inactive",
        },
        {
            id: "4",
            name: "Conference Room Mic",
            status: "Inactive",
        },
        {
            id: "5",
            name: "Reception Desk Speaker",
            status: "Error",
        },
        {
            id: "6",
            name: "Parking Lot Speaker",
            status: "Active",
        },
    ];
    return (
        <div className="max-h-72 overflow-y-auto space-y-2 pr-2">
            {devices.map((device, index) => (
                <div key={device.id} className="p-3 border rounded-md shadow-sm bg-muted">
                    <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                            <Checkbox size={16} variant="blue" />
                            <p className="text-sm font-medium">{device.name}</p>
                        </div>
                        <StatusTabs statuses={device.status} />
                    </div>
                </div>
            ))}
        </div>
    );
}
