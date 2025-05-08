import { TableHandler } from "@/components/table-handler";
import { Navigate } from "react-router-dom";
import PageInnerLayout from "@/layouts/PageInnerLayout";
import { PUBLIC_ROUTES } from "@/config/routes.config";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { AnnouncementTable } from "@/components/admin/announcements/announcement-table";
import { DeviceForm } from "@/components/admin/devices/device-form";

type TableExtraProps = {

};

export default function Announcements() {
    const { user } = useAuth();

    // if (!user) return <Navigate to={PUBLIC_ROUTES.LOGIN} replace />;

    // const currentUserLevel = user.level;
    const  AnnouncementData = [
        {
            id: 1,
            subject: "System Maintenance",
            text_post: "The system will undergo maintenance tonight at 11 PM.",
            zone: "North Wing",
            devices: "Device A, Device B",
            status: 'online',
            Sounds_file: "maintenance_alert.mp3",
        },
        {
            id: 2,
            subject: "Fire Drill",
            text_post: "Scheduled fire drill at 3 PM. Please cooperate.",
            zone: "All Zones",
            devices: "All Devices",
            status: 'online',
            Sounds_file: "fire_drill.mp3",
        },
        {
            id: 3,
            subject: "New Policy Update",
            text_post: "Please review the updated company policies.",
            zone: "Main Office",
            devices: "Device C",
            status: 'online',
            Sounds_file: "policy_update.mp3",
        },
        {
            id: 4,
            subject: "Event Reminder",
            text_post: "Team building event tomorrow at 2 PM.",
            zone: "Recreation Area",
            devices: "Device D, Device E",
            status: 'online',
            Sounds_file: "event_reminder.mp3",
        },
        {
            id: 5,
            subject: "System Update",
            text_post: "System update v2.1 will be released on Friday.",
            zone: "IT Department",
            devices: "Device F",
            status: 'online',
            Sounds_file: "update_alert.mp3",
        },
    ];
    return (
        <PageInnerLayout Header={<Header />}>
            <TableHandler<any, any, any, TableExtraProps>
                queryKey="Announcement_details"
                queryFn={async (params) => {

                    return {
                        data: AnnouncementData,
                        total: AnnouncementData.length,
                        page: params.page,
                        limit: params.limit,
                        totalPage: Math.ceil(AnnouncementData.length / params.limit),
                    } as any;
                }}

                TableComponent={AnnouncementTable}
                FormComponent={DeviceForm}
                initialPage={1}
                initialLimit={10}
            /> *
        </PageInnerLayout>
    );
}

const Header = () => null;

