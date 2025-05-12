import { FieldConfig } from "@/@types/feild.type";
import { Button } from "@/components/ui/button";
import { Loader2, Cpu } from "lucide-react";
import { useInput } from "@/hooks/use-input";
import { useAppForm } from "@/components/ui/tanstack-form";
import { z } from "zod";
import { toast } from "sonner";
import { ModalForm } from "@/components/form/modal-form";
import { Device, DeviceStatus } from "@/@types/device.type";
import { FormBaseProps } from "@/components/form-handler";
import { MessageResponse } from "@/@types/general.type";

// export const DeviceSchema = z.object({
//   name: z.string().min(1, {
//     message: "name is required.",
//   }),
//   zone: z.string().min(1, {
//     message: "zone is required.",
//   }),
//   status: z.nativeEnum(DeviceStatus, {
//     errorMap: () => ({ message: "Invalid device status." }),
//   }),
// });

type DeviceFormProps = FormBaseProps<any, Device> & {
  open: boolean;
  closeForm: () => void;
  values?: Device | null;
  isEditMode?: boolean;
};

export function DeviceForm({
  handleSubmit,
  isSubmitting,
  error,
  open,
  closeForm,
  values,
  isEditMode = false,
}: DeviceFormProps) {
  console.log("DeviceForm", values);
  const fields: FieldConfig[] = [
    {
      id: "label",
      name: "label",
      label: "Device Name",
      placeholder: "12312",
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
        { label: "Alpha 1", value: "alpha 1" },
        { label: "Alpha 2", value: "alpha 2" },
         { label: "Alpha 4", value: "alpha 4" },
      ],
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
    label: "",
    zone: {
      name: "",
    },
    status: DeviceStatus.ONLINE,
  };

  const formDefaultValues = values
  ? {
      ...defaultValues,
      ...Object.fromEntries(
        Object.entries(values).filter(([key]) => key in defaultValues)
      ),
      zone: {
        ...defaultValues.zone,
        ...(values.zone ?? {}),
      },
    }
  : {
      ...defaultValues,
    };

  const form = useAppForm({
    // validators: { onSubmit: DeviceSchema },
    defaultValues: formDefaultValues,
    // onSubmit: async ({ value }) => {
    //   try {
    //     const res = await handleSubmit(value);

    //     const { message } = res as MessageResponse;

    //     toast.success(
    //       message || `Device ${isEditMode ? "updated" : "added"} successfully`
    //     );

    //     closeDeviceForm();
    //   } catch (err: any) {
    //     const message =
    //       typeof err === "string" ? err : err?.message || "Please try again";
    //     toast.error(
    //       `Error ${isEditMode ? "updating" : "adding"} device: ${message}`
    //     );
    //   }
    // },
  });
  
  const closeDeviceForm = () => {
    closeForm();
    form.reset();
  };

  const onOpenChange = (state: boolean) => {
    if (state === false) closeDeviceForm();
  };

  const { inputs } = useInput({
    fields,
    form,
  });

  return (
    <ModalForm
      title={`${isEditMode ? "Edit" : "Add"} Device`}
      description={`${isEditMode ? "Edit" : "Add a new"} device to NASTP`}
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
              closeDeviceForm();
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
