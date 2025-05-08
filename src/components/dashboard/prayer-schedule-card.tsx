import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";
import AudioWaveform from "./audio-waver";

const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

export default function PrayerScheduleCard() {
  return (
    <Card className="w-full">
      <CardContent className="flex flex-col">
        <div className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm text-muted-foreground">Prayer Schedule</CardTitle>
          <Switch variant="blue" />
        </div>
        {prayers.map((prayer, index) => (
          <div key={prayer} className="flex flex-col">
            <div className="flex items-center justify-between p-1">
              <div className="flex items-center gap-6">
                <Checkbox id={prayer} variant="blue" />
                <Label htmlFor={prayer}>{prayer}</Label>
              </div>
              <AudioWaveform />
            </div>

            {index !== prayers.length - 1 && <Separator />}
          </div>
        ))}

      </CardContent>
    </Card >
  );
}
