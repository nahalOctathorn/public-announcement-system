import { TableHandler } from "@/components/table-handler";
import { Navigate } from "react-router-dom";
import PageInnerLayout from "@/layouts/PageInnerLayout";
import { PUBLIC_ROUTES } from "@/config/routes.config";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { AudioTable } from "@/components/admin/audios/audio-table";
import { AudioForm } from "@/components/admin/audios/audio-form";
import { fetchAudios } from "@/services/audio.api";

type TableExtraProps = {

};

export default function Audios() {
    const { user } = useAuth();

    // if (!user) return <Navigate to={PUBLIC_ROUTES.LOGIN} replace />;
   
    return (
        <PageInnerLayout Header={<Header />}>
            <TableHandler<any, any, any, TableExtraProps>
                queryKey="Audios"
                 queryFn={(params) => fetchAudios(params)}
                TableComponent={AudioTable}
                FormComponent={AudioForm}
                initialPage={1}
                initialLimit={10}
            />
        </PageInnerLayout>
    );
}

const Header = () => null;

