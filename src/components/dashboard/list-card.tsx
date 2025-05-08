import { Card, CardContent } from "../ui/card";
import StatusTabs from "./status-tabs";
export default function DeviceListCard({Devices}: DeviceListCardProps) {
  
  return (
    <Card className="w-full">
        <CardContent className="space-y-4">
            <div className="text-sm font-semibold text-muted-foreground">
                Total Devices{" "} 
                <span className="text-xl ml-4 text-black font-semibold">10/12</span>
            </div>
            {Devices.slice(0, 4).map((device, index) => (
                <div key={index} className="space-y-1 flex items-start gap-3">
                    {device.image && (
                        <img
                            src={device.image}
                            alt={device.name}
                            width={32}
                            height={32}
                            className="rounded-full mt-1"
                        />
                    )}
                    <div className="flex-1 ">
                        <div className="flex items-center justify-between">
                            <div className="text-sm font-medium text-black">{device.name}<br/> <span className="text-xs text-muted-foreground">{device.status}</span></div>
                            <StatusTabs statuses={device.activeStatus || "unknown"} />
                        </div>
                        {index < 3 && <hr className="mt-2 border-gray-200" />}
                    </div>
                </div>
            ))}
            <div className="text-xs text-primary mt-4 cursor-pointer hover:underline w-fit">
                See All
            </div>
        </CardContent>
    </Card>
);
}
