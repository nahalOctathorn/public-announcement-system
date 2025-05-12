import { TableHandler } from "@/components/table-handler";
import { Navigate } from "react-router-dom";
import PageInnerLayout from "@/layouts/PageInnerLayout";
import { PUBLIC_ROUTES } from "@/config/routes.config";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { AnnouncementTable } from "@/components/admin/announcements/announcement-table";
import { DeviceForm } from "@/components/admin/devices/device-form";
import { fetchAnnouncements } from "@/services/announcement.api";

type TableExtraProps = {

};

export default function Schedule() {
    const { user } = useAuth();

    // if (!user) return <Navigate to={PUBLIC_ROUTES.LOGIN} replace />;

    // const currentUserLevel = user.level;

    return (
        <PageInnerLayout Header={<Header />}>
            <TableHandler<any, any, any, TableExtraProps>
                queryKey="announcements"
                queryFn={async (params) => {
                    const data = await fetchAnnouncements(params);
                    return {
                        ...data,
                        data: data.data.filter((item: any) => item.type === "SCHEDULED"),
                    };
                    
                }}
                TableComponent={AnnouncementTable}
                FormComponent={DeviceForm}
                initialPage={1}
                initialLimit={10}
            />
        </PageInnerLayout>
    );
}

const Header = () => null;

