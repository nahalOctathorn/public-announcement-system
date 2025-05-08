import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";


export default function AudioList() {
    const audios = [
        {
          id: "1",
          title: "Office Fire Drill",
          duration: "0:30",
        },
        {
          id: "2",
          title: "Evacuation Alert",
          duration: "0:45",
        },
        {
          id: "3",
          title: "Emergency Contact",
          duration: "0:25",
        },
        {
          id: "4",
          title: "Lockdown Message",
          duration: "1:00",
        },
        {
          id: "5",
          title: "Weather Alert",
          duration: "0:35",
        },
        {
          id: "6",
          title: "System Update",
          duration: "0:20",
        },
      ];
      
  const [playingId, setPlayingId] = useState<string | null>(null);

  const togglePlay = (id: string) => {
    setPlayingId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="max-h-72 overflow-y-auto space-y-2 pr-2">
      {audios.map((audio, index) => (
        <div key={audio.id} className="p-3 border rounded-md shadow-sm bg-muted">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{audio.title}</p>
              {audio.duration && (
                <p className="text-xs text-muted-foreground">{audio.duration}</p>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => togglePlay(audio.id)}
            >
              {playingId === audio.id ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </Button>
          </div>
          {index < audios.length - 1 && <Separator className="mt-2" />}
        </div>
      ))}
    </div>
  );
}
