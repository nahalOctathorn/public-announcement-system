import { TableHandler } from "@/components/table-handler";
import { Navigate } from "react-router-dom";
import PageInnerLayout from "@/layouts/PageInnerLayout";
import { PUBLIC_ROUTES } from "@/config/routes.config";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { DeviceTable } from "@/components/admin/devices/device-table";
import { DeviceForm } from "@/components/admin/devices/device-form";
import { ListParams, PaginatedResponse } from "@/@types/api.type";
import { fetchDevice, fetchDevices } from "@/services/device.api";
import { Device } from "@/@types/device.type";
import { useQuery } from '@tanstack/react-query';
import { fetchZones } from "@/services/zone.api";
import { Zone } from "@/@types/zone.type";
import { useEffect, useState } from "react";
type TableExtraProps = {

};

export default function Devices() {
  const { user } = useAuth();
  const [zones, setZones] = useState<Zone[]>([]);
  // if (!user) return <Navigate to={PUBLIC_ROUTES.LOGIN} replace />;

  // const currentUserLevel = user.level;
  useEffect(() => {
    const fetchAllZones = async () => {
      try {
        let allZones: Zone[] = [];
        let page = 1;
        const limit = 10;
        while (true) {
          const res: PaginatedResponse<Zone> = await fetchZones({ page, limit });
          allZones = [...allZones, ...res.data];

          if (!res.hasNextPage) break;
          page++;
        }

        setZones(allZones);
      } catch (err: any) {
        console.log(err.message || "Failed to load zones");
      } finally {
      }
    };

    fetchAllZones();
  }, []);
  return (
    <PageInnerLayout Header={<Header />}>
      <TableHandler<Device, any, any, TableExtraProps>
        queryKey="devices"
        queryFn={(params) => fetchDevices(params)}
        TableComponent={DeviceTable}
        FormComponent={(formProps) => (
          <DeviceForm {...formProps} zones={zones} />
        )}
        initialPage={1}
        initialLimit={10}
        queryFnSingle={fetchDevice}
        queryKeySingle={"device"}
      />
    </PageInnerLayout>
  );
}

const Header = () => null;

