import { TableHandler } from "@/components/table-handler";
import { Navigate } from "react-router-dom";
import PageInnerLayout from "@/layouts/PageInnerLayout";
import { PUBLIC_ROUTES } from "@/config/routes.config";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { ZoneTable } from "@/components/admin/zones/zone-table";
import { ZoneForm } from "@/components/admin/zones/zone-form";

type TableExtraProps = {

};

export default function Zones() {
    const { user } = useAuth();

    // if (!user) return <Navigate to={PUBLIC_ROUTES.LOGIN} replace />;

    const ZoneData = [
      { id:1, name: 'Zone 1.0', location: 'Alpha 3'},
      { id:2, name: 'Zone 5.20',location: 'Alpha 8'},
      { id:3, name: 'Zone 1.60',location: 'Alpha 12'},
      { id:4, name: 'Zone 12.0',location: 'Alpha 9'},
    ];
   
    return (
        <PageInnerLayout Header={<Header />}>
            <TableHandler<any, any, any, TableExtraProps>
                queryKey="Zone_details"
                queryFn={async (params) => {

                    return {
                        data: ZoneData,
                        total: ZoneData.length,
                        page: params.page,
                        limit: params.limit,
                        totalPage: Math.ceil(ZoneData.length / params.limit),
                    } as any;
                }}

                TableComponent={ZoneTable}
                FormComponent={ZoneForm}
                initialPage={1}
                initialLimit={10}
            /> *
        </PageInnerLayout>
    );
}

const Header = () => null;

