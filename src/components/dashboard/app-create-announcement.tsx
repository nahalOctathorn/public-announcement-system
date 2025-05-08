import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import alphaLogo from "@/assets/alpha-logo 1.png";
import { Input } from "../ui/input";
import { Clock, Mic, Smartphone } from "lucide-react";
import { Button } from "../ui/button";
import { TypeButton } from "../layout/app-type-button";
import AudioModal from "./modals/audio-modals";
import DeviceModal from "./modals/devices-modal";

export default function CreateAnnouncement() {
  const [isAudioModalOpen, setAudioModalOpen] = useState(false);
  const [isDeviceModalOpen, setDeviceModalOpen] = useState(false);

  return (
    <>
      <Card className="bg-card">
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <img
              src={alphaLogo}
              alt="Alpha Logo"
              className="w-8 h-8 object-contain rounded"
            />
            <Input placeholder="Name" className="flex-1" />
            <Input placeholder="Create Announcements" className="flex-1" />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button
                onClick={() => setAudioModalOpen(true)}
                className="flex items-center gap-1 bg-gray-200 text-black hover:text-white"
              >
                <Mic size={16} className="text-primary hover:text-white" />
                Audio
              </Button>

              <Button
                onClick={() => setDeviceModalOpen(true)}
                className="flex items-center gap-1 bg-gray-200 text-black hover:text-white"
              >
                <Smartphone size={16} className="text-red-600" />
                Devices
              </Button>

              <TypeButton />
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <Clock />
              <Button>Post</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <AudioModal
        open={isAudioModalOpen}
        onOpenChange={setAudioModalOpen}
        title="Audio List"
        description="Select or upload an audio message"
        width="md"
      />

      <DeviceModal
        open={isDeviceModalOpen}
        onOpenChange={setDeviceModalOpen}
        title=""
        description=""
        width="md"
      />
    </>
  );
}
