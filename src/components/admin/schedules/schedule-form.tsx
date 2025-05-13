import { FieldConfig } from "@/@types/feild.type";
import { Button } from "@/components/ui/button";
import { Loader2, Cpu } from "lucide-react";
import { useInput } from "@/hooks/use-input";
import { useAppForm } from "@/components/ui/tanstack-form";
import { z } from "zod";
import { toast } from "sonner";
import { ModalForm } from "@/components/form/modal-form";
import { Announcement } from "@/@types/announcement.type";
import { FormBaseProps } from "@/components/form-handler";
import { MessageResponse } from "@/@types/general.type";

// export const ScheduleSchema = z.object({
//   name: z.string().min(1, {
//     message: "name is required.",
//   }),
//   zone: z.string().min(1, {
//     message: "zone is required.",
//   }),
//   status: z.nativeEnum(ScheduleStatus, {
//     errorMap: () => ({ message: "Invalid Schedule status." }),
//   }),
// });

type ScheduleFormProps = FormBaseProps<any, Announcement> & {
    open: boolean;
    closeForm: () => void;
    values?: Announcement | null;
    isEditMode?: boolean;
};

export function ScheduleForm({
    handleSubmit,
    isSubmitting,
    error,
    open,
    closeForm,
    values,
    isEditMode = false,
}: ScheduleFormProps) {
    const fields: FieldConfig[] = [
        {
            id: "name",
            name: "name",
            label: "Title",
            placeholder: "-",
            type: "text",
            required: true,
        },
        {
            id: "zone",
            name: "zone.name",
            label: "Zone / Location",
            placeholder: "Alpha",
            type: "select",
            required: true,
            className: "w-full",
            options: [
                { label: "Alpha 1", value: "alpha-1" },
                { label: "Alpha 2", value: "alpha-2" },
                { label: "Alpha 4", value: "alpha-4" },
            ],
        },
        {
            id: "device",
            name: "device",
            label: "Assign Device",
            placeholder: "-",
            type: "select",
            required: true,
            className: "w-full",
            options: [
                { label: "Device 1", value: "device-1" },
                { label: "Device 2", value: "device-2" },
            ],
        },
        {
            id: "frequency",
            name: "frequency",
            label: "Frequency",
            placeholder: "Everyday",
            type: "select",
            className: "w-full",
            required: true,
            options: [
                { label: "Everyday", value: "everyday" },
                { label: "Weekdays", value: "weekdays" },
                { label: "Weekends", value: "weekends" },
            ],
        },
        {
            id: "time",
            name: "time",
            label: "Time",
            placeholder: "Select",
            type: "text", // You may need to use "text" or a custom time picker component if not supported
            required: true,
        },
        {
            id: "status",
            name: "status",
            label: "Select Status",
            type: "select",
            required: true,
            className: "w-full",
            options: [
                { label: "Online", value: "online" },
                { label: "Offline", value: "offline" },
            ],
        },
    ];

    const defaultValues = {
        name: "",
        zone: {
            name: "",
        },
        status: "",
    };

    const formDefaultValues = values
        ? {
            ...defaultValues,
            ...Object.fromEntries(
                Object.entries(values).filter(([key]) => key in defaultValues)
            ),
            //   zone: {
            //     ...defaultValues.zone,
            //     ...(values.zone ?? {}),
            //   },
        }
        : {
            ...defaultValues,
        };

    const form = useAppForm({
        // validators: { onSubmit: ScheduleSchema },
        defaultValues: formDefaultValues,
        // onSubmit: async ({ value }) => {
        //   try {
        //     const res = await handleSubmit(value);

        //     const { message } = res as MessageResponse;

        //     toast.success(
        //       message || `Schedule ${isEditMode ? "updated" : "added"} successfully`
        //     );

        //     closeScheduleForm();
        //   } catch (err: any) {
        //     const message =
        //       typeof err === "string" ? err : err?.message || "Please try again";
        //     toast.error(
        //       `Error ${isEditMode ? "updating" : "adding"} Schedule: ${message}`
        //     );
        //   }
        // },
    });

    const closeScheduleForm = () => {
        closeForm();
        form.reset();
    };

    const onOpenChange = (state: boolean) => {
        if (state === false) closeScheduleForm();
    };

    const { inputs } = useInput({
        fields,
        form,
    });

    return (
        <ModalForm
            title={`${isEditMode ? "Edit" : "Add"} Schedule`}
            description={`${isEditMode ? "Edit" : "Add a new"} Schedule to NASTP`}
            form={form}
            loading={isSubmitting}
            error={error}
            open={open}
            onOpenChange={onOpenChange}
            buttons={
                <>
                    <Button
                        variant="secondary"
                        onClick={(e) => {
                            e.preventDefault();
                            closeScheduleForm();
                        }}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isEditMode ? "Update" : "Done"}
                    </Button>
                </>
            }
        >
            <div className="grid gap-6 items-start">
                {inputs}
            </div>
        </ModalForm>
    );
}
