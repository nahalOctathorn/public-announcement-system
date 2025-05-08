import { TableHandler } from "@/components/table-handler";
import { Navigate } from "react-router-dom";
import PageInnerLayout from "@/layouts/PageInnerLayout";
import { PUBLIC_ROUTES } from "@/config/routes.config";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { DeviceTable } from "@/components/admin/devices/device-table";
import { DeviceForm } from "@/components/admin/devices/device-form";

type TableExtraProps = {

};

export default function Devices() {
  const { user } = useAuth();

  // if (!user) return <Navigate to={PUBLIC_ROUTES.LOGIN} replace />;

  // const currentUserLevel = user.level;
  const deviceData = [
    { id:1, name: 'Device 1.0', zone: 'Alpha 3', status: 'online' },
    { id:2, name: 'Device 5.20', zone: 'Alpha 8', status: 'online' },
    { id:3, name: 'Device 1.60', zone: 'Alpha 12', status: 'online' },
    { id:4, name: 'Device 12.0', zone: 'Alpha 9', status: 'online' },
  ];
  return (
    <PageInnerLayout Header={<Header />}>
       <TableHandler<any, any, any, TableExtraProps>
                queryKey="device_details"
                queryFn={async (params) => {

                  return {
                    data: deviceData,
                    total: deviceData.length,
                    page: params.page,
                    limit: params.limit,
                    totalPage: Math.ceil(deviceData.length / params.limit),
                  } as any;
                }}

                TableComponent={DeviceTable}
                FormComponent={DeviceForm}
                initialPage={1}
                initialLimit={10}
            /> *
    </PageInnerLayout>
  );
}

const Header = () => null;

