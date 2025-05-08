import { TableHandler } from "@/components/table-handler";
import { Navigate } from "react-router-dom";
import PageInnerLayout from "@/layouts/PageInnerLayout";
import { PUBLIC_ROUTES } from "@/config/routes.config";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { AudioTable } from "@/components/admin/audios/audio-table";
import { AudioForm } from "@/components/admin/audios/audio-form";

type TableExtraProps = {

};

export default function Audios() {
    const { user } = useAuth();

    // if (!user) return <Navigate to={PUBLIC_ROUTES.LOGIN} replace />;

    const AudioData = [
      { id:1, name: 'Audio 1.0',  duration:2, mimType: 'Alpha 3'},
      { id:2, name: 'Audio 5.20', duration:2, mimType: 'Alpha 8'},
      { id:3, name: 'Audio 1.60', duration:2, mimType: 'Alpha 12'},
      { id:4, name: 'Audio 12.0', duration:2, mimType: 'Alpha 9'},
    ];
   
    return (
        <PageInnerLayout Header={<Header />}>
            <TableHandler<any, any, any, TableExtraProps>
                queryKey="Audio_details"
                queryFn={async (params) => {

                    return {
                        data: AudioData,
                        total: AudioData.length,
                        page: params.page,
                        limit: params.limit,
                        totalPage: Math.ceil(AudioData.length / params.limit),
                    } as any;
                }}

                TableComponent={AudioTable}
                FormComponent={AudioForm}
                initialPage={1}
                initialLimit={10}
            /> *
        </PageInnerLayout>
    );
}

const Header = () => null;

