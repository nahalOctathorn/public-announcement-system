import { TableHandler } from "@/components/table-handler";
import { Navigate } from "react-router-dom";
import PageInnerLayout from "@/layouts/PageInnerLayout";
import { PUBLIC_ROUTES } from "@/config/routes.config";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { DeviceTable } from "@/components/admin/devices/device-table";
import { DeviceForm } from "@/components/admin/devices/device-form";
import { ListParams } from "@/@types/api.type";
import { fetchDevice, fetchDevices } from "@/services/device.api";
import { Device } from "@/@types/device.type";

type TableExtraProps = {

};

export default function Devices() {
  const { user } = useAuth();

  // if (!user) return <Navigate to={PUBLIC_ROUTES.LOGIN} replace />;

  // const currentUserLevel = user.level;
  const deviceData = [
    { id: 1, label: 'Device 1.0', zone: 'Alpha 3', status: 'online' },
    { id: 2, label: 'Device 5.20', zone: 'Alpha 8', status: 'online' },
    { id: 3, label: 'Device 1.60', zone: 'Alpha 12', status: 'online' },
    { id: 4, label: 'Device 12.0', zone: 'Alpha 9', status: 'online' },
  ];
  return (
    <PageInnerLayout Header={<Header />}>
      <TableHandler<Device, any, any, TableExtraProps>
        queryKey="devices"
        queryFn={(params) => fetchDevices(params)}
        TableComponent={DeviceTable}
        FormComponent={DeviceForm}
        initialPage={1}
        initialLimit={10}
        queryFnSingle={fetchDevice}
        queryKeySingle={"device"}
      />
    </PageInnerLayout>
  );
}

const Header = () => null;

