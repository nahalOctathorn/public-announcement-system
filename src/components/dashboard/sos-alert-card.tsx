import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";
import PlayButton from "./play-button";
import AudioWaveform from "./audio-waver";

const alerts = ["Fire Alert", "Security Breach", "Intruder Alert"];

export default function SOSAlertsCard() {
    return (
        <Card className="w-full">
            <CardContent className="flex flex-col">
                <CardTitle className="text-sm text-muted-foreground mb-2">
                    Important SOS Alerts
                </CardTitle>

                <div className="flex flex-col space-y-4">
  {alerts.map((alert, index) => (
    <div key={alert} className="flex flex-col">
      <div className="flex items-center justify-between py-2">
        {/* Left: Switch + Label + Text */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Switch id={alert} variant="blue" />
            <Label htmlFor={alert} className="text-nowrap">{alert}</Label>
          </div>
          <p className="text-xs text-muted-foreground">
            Devices: 12/23 | Zone: All
          </p>
        </div>

        {/* Right: Audio + Play */}
        <div className="flex items-center gap-4">
          <AudioWaveform />
          <PlayButton />
        </div>
      </div>

      {index !== alerts.length - 1 && <Separator className="mt-2" />}
    </div>
  ))}
</div>

            </CardContent>
        </Card>
    );
}
