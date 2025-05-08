import { AppModal } from "@/components/layout/app-dialog";
import AppSearch from "@/components/layout/app-search";
import { Mic, Upload } from "lucide-react";
import AudioList from "./audio-modal-content";
import { useState } from "react";
interface FormProps {
  open: boolean;
  onOpenChange: (state: boolean) => void;
  loading?: boolean;
  error?: string | null;
  title: string;
  description?: string;
  footerContent?: ReactNode;
  children: ReactNode;
  buttons?: ReactNode;
  width?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "full";
}

export default function AudioModal({ open,
  onOpenChange,
  title,
  description,
  footerContent,
  width = "lg",
}: FormProps) {

  const [isRecording, setIsRecording]=useState(false)
  const handleRecording = () => {
    setIsRecording((prev) => !prev);
  };
  
  return (
      <AppModal
        title={title}
        description={description}
        open={open}
        onOpenChange={onOpenChange}
        width={width}
        footerContent={footerContent}
      >
        <div className="flex items-center gap-2 mb-4">
          <AppSearch SearchItem="Search..." />
          <div onClick={handleRecording} className={`p-2 rounded-full border-1 bg-gray-200 hover:bg-blue-100 cursor-pointer  border-blue    ${isRecording ? "animate-pulse bg-blue-900  border-2 text-white scale-125 " : "bg-gray-200 hover:bg-blue-100 text-blue-500"}` }>
            <Mic className="text-blue-600" size={20} />
          </div>
          <div className="p-2 rounded-full bg-gray-200 hover:bg-blue-100 cursor-pointer border-1 border-primary">
            <Upload className="text-primary" size={20} />
          </div>
        </div>
        <AudioList />
      </AppModal>
  )
}
