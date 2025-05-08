import { FormHandler } from "@/components/form-handler";
import { SendResetLinkForm } from "@/components/auth/send-reset-link-form";
import { SendResetLinkData } from "@/@types/auth.type";
import { sendResetLink } from "@/services/auth.api";
import { MessageResponse } from "@/@types/general.type";

export default function SendResetLink() {
  return (
    <FormHandler<SendResetLinkData, MessageResponse>
      mutationFn={sendResetLink}
      FormComponent={SendResetLinkForm}
    />
  );
}
