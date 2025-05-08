import { FieldConfig } from "@/@types/feild.type";
import { Button } from "@/components/ui/button";
import { Loader2, Cpu } from "lucide-react";
import { useInput } from "@/hooks/use-input";
import { useAppForm } from "@/components/ui/tanstack-form";
import { z } from "zod";
import { toast } from "sonner";
import { ModalForm } from "@/components/form/modal-form";
import { Zone} from "@/@types/zone.type";
import { FormBaseProps } from "@/components/form-handler";
import { MessageResponse } from "@/@types/general.type";

export const ZoneSchema = z.object({
  name: z.string().min(1, {
    message: "name is required.",
  }),
  location: z.string().min(1, {
    message: "location is required.",
  }),
});

type ZoneFormProps = FormBaseProps<any, Zone> & {
  open: boolean;
  closeForm: () => void;
  values?: Zone | null;
  isEditMode?: boolean;
};

export function ZoneForm({
  handleSubmit,
  isSubmitting,
  error,
  open,
  closeForm,
  values,
  isEditMode = false,
}: ZoneFormProps) {
  const fields: FieldConfig[] = [
    {
      id: "name",
      name: "name",
      label: "Zone Name",
      placeholder: "12312",
      type: "text",
      required: true,
    },
    {
        id: "location",
        name: "location",
        label: "Location",
        placeholder: "Alpha 1",
        type: "text",
        required: true,
      },
  ];

  const defaultValues = {
    name: "",
    location: "",
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
    validators: { onSubmit: ZoneSchema },
    defaultValues: formDefaultValues,
    // onSubmit: async ({ value }) => {
    //   try {
    //     const res = await handleSubmit(value);

    //     const { message } = res as MessageResponse;

    //     toast.success(
    //       message || `Zone ${isEditMode ? "updated" : "added"} successfully`
    //     );

    //     closeZoneForm();
    //   } catch (err: any) {
    //     const message =
    //       typeof err === "string" ? err : err?.message || "Please try again";
    //     toast.error(
    //       `Error ${isEditMode ? "updating" : "adding"} Zone: ${message}`
    //     );
    //   }
    // },
  });
  
  const closeZoneForm = () => {
    closeForm();
    form.reset();
  };

  const onOpenChange = (state: boolean) => {
    if (state === false) closeZoneForm();
  };

  const { inputs } = useInput({
    fields,
    form,
  });

  return (
    <ModalForm
      title={`${isEditMode ? "Edit" : "Add"} Zone`}
      description={`${isEditMode ? "Edit" : "Add a new"} Zone to NASTP`}
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
              closeZoneForm();
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
