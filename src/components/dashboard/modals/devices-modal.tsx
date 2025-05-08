import { AppModal } from "@/components/layout/app-dialog";
import AppSearch from "@/components/layout/app-search";
import { Mic, Upload } from "lucide-react";
import AudioList from "./audio-modal-content";
import DevicesList from "./devices-list";
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

export default function DeviceModal({ open,
    onOpenChange,
    title,
    description,
    footerContent,
    width = "lg",
}: FormProps) {

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
            </div>
            <DevicesList />
        </AppModal>
    )
}
