import { TableHandler } from "@/components/table-handler";
import { Navigate } from "react-router-dom";
import PageInnerLayout from "@/layouts/PageInnerLayout";
import { PUBLIC_ROUTES } from "@/config/routes.config";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { ZoneTable } from "@/components/admin/zones/zone-table";
import { ZoneForm } from "@/components/admin/zones/zone-form";
import { fetchZone, fetchZones } from "@/services/zone.api";

type TableExtraProps = {

};

export default function Zones() {
    const { user } = useAuth();

    // if (!user) return <Navigate to={PUBLIC_ROUTES.LOGIN} replace />;
    return (
        <PageInnerLayout Header={<Header />}>
            <TableHandler<any, any, any, TableExtraProps>
                queryKey="Zones"
                queryFn={(params) => fetchZones(params)}
                TableComponent={ZoneTable}
                FormComponent={ZoneForm}
                initialPage={1}
                initialLimit={10}
                queryFnSingle={fetchZone}
                queryKeySingle={"zone"}
            />
        </PageInnerLayout>
    );
}

const Header = () => null;

