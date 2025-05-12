import { FieldConfig } from "@/@types/feild.type";
import { Button } from "@/components/ui/button";
import { Loader2, Cpu } from "lucide-react";
import { useInput } from "@/hooks/use-input";
import { useAppForm } from "@/components/ui/tanstack-form";
import { z } from "zod";
import { toast } from "sonner";
import { ModalForm } from "@/components/form/modal-form";
import { Audio } from "@/@types/audio.type";
import { FormBaseProps } from "@/components/form-handler";
import { MessageResponse } from "@/@types/general.type";

export const AudioSchema = z.object({
    name: z.string().min(1, {
        message: "name is required.",
    }),
    duration: z.number().min(1, {
        message: "duration is required.",
    }),
    mimType: z.string().min(1, {
        message: "mim type is required.",
    }),
});

type AudioFormProps = FormBaseProps<any, Audio> & {
    open: boolean;
    closeForm: () => void;
    values?: Audio | null;
    isEditMode?: boolean;
};

export function AudioForm({
    handleSubmit,
    isSubmitting,
    error,
    open,
    closeForm,
    values,
    isEditMode = false,
}: AudioFormProps) {
    const fields: FieldConfig[] = [
        {
            id: "name",
            name: "name",
            label: "Audio Name",
            placeholder: "12312",
            type: "text",
            required: true,
        },
        {
            id: "duration",
            name: "duration",
            label: "Audio Duration",
            placeholder: "Alpha",
            type: "text",
            required: true,
        },
        {
            id: "mimeType",
            name: "mimeType",
            label: "Audio Mime Type",
            placeholder: "Alpha",
            type: "text",
            required: true,
        },
    ];

    const defaultValues = {
        name: "",
        duration: 0,
        mimType: "",
    };

    const formDefaultValues = values
        ? {
            ...defaultValues,
            ...Object.fromEntries(
                Object.entries(values).filter(([key]) => key in defaultValues)
            ),
        }
        : {
            ...defaultValues,
        };

    const form = useAppForm({
        validators: { onSubmit: AudioSchema },
        defaultValues: formDefaultValues,
        // onSubmit: async ({ value }) => {
        //   try {
        //     const res = await handleSubmit(value);

        //     const { message } = res as MessageResponse;

        //     toast.success(
        //       message || `Audio ${isEditMode ? "updated" : "added"} successfully`
        //     );

        //     closeAudioForm();
        //   } catch (err: any) {
        //     const message =
        //       typeof err === "string" ? err : err?.message || "Please try again";
        //     toast.error(
        //       `Error ${isEditMode ? "updating" : "adding"} Audio: ${message}`
        //     );
        //   }
        // },
    });

    const closeAudioForm = () => {
        closeForm();
        form.reset();
    };

    const onOpenChange = (state: boolean) => {
        if (state === false) closeAudioForm();
    };

    const { inputs } = useInput({
        fields,
        form,
    });

    return (
        <ModalForm
            title={`${isEditMode ? "Edit" : "Add"} Audio`}
            description={`${isEditMode ? "Edit" : "Add a new"} Audio to NASTP`}
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
                            closeAudioForm();
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
