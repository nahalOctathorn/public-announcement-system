import { Card, CardContent, } from "@/components/ui/card";
import PlayButton from "./play-button";
import AudioWaveform from "./audio-waver";

export default function AnnouncementCard() {
  const announcements = [
    {
      name: "Firmware Update Released",
      date: "May 5, 2025",
      alphas: ["Alpha 5", "Alpha 4", "Alpha 8"],
      devices: ["Device A", "Device B"],
      message:
        "We’ve released a new firmware update for Alpha series devices. Please check your dashboard to install.",
    },
    {
      name: "Maintenance Scheduled",
      date: "May 3, 2025",
      alphas: ["Alpha 2"],
      devices: ["Device C"],
      message:
        "Scheduled maintenance will occur on May 10 from 2AM to 4AM UTC.",
    },
    {
      name: "Security Patch Notice",
      date: "May 1, 2025",
      alphas: ["Alpha 8", "Alpha 1"],
      devices: ["Device D", "Device E"],
      message:
        "We’re excited to announce a new dashboard feature for enhanced analytics!",
    },
    {
      name: "New Feature Rollout",
      date: "April 29, 2025",
      alphas: ["Alpha 3"],
      devices: ["Device F"],
      message:
        "We’re excited to announce a new dashboard feature for enhanced analytics!",
    },
  ];

  const visibleAnnouncements = announcements.slice(0, 3);

  return (
    <Card className="w-full">
      <CardContent className="space-y-2">
        <h2 className="text-sm text-muted-foreground font-semibold mb-4">Recent Announcements</h2>
        {visibleAnnouncements.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex flex-row justify-between">

            <div className="text-sm font-semibold text-gray-800">
              {item.name}
            </div>
            <div className="text-xs text-muted-foreground">
              Date: {item.date}
            </div>
            </div>
            <div className="text-xs text-gray-700">
              {item.alphas.join(" | ")}
            </div>
            <div className="text-xs text-gray-700">
              {item.devices.join(" | ")}
            </div>
            <div className="text-sm text-gray-800">
              {item.message.length > 100
                ? item.message.slice(0, 100) + "..."
                : item.message}
            </div>
            <div className="flex flex-row items-center gap-4">
              <div>
              <PlayButton />
              </div>
              <AudioWaveform/>
            </div>
            {index < visibleAnnouncements.length - 1 && (
              <hr className="mt-3 border-gray-200" />
            )}
          </div>
        ))}

        {announcements.length > 3 && (
          <div className="text-xs text-primary mt-2 cursor-pointer hover:underline w-fit">
            See All
          </div>
        )}
      </CardContent>
    </Card>
  );
}
