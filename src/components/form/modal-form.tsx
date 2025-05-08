import { ReactNode, useState, useEffect } from "react";

import { AppForm } from "../layout/app-form";
import { Loader2 } from "lucide-react";
import { AppModal } from "../layout/app-dialog";


interface FormProps {
  open: boolean;
  onOpenChange: (state: boolean) => void;
  loading?: boolean;
  error?: string | null;
  title: string;
  description?: string;
  footerContent?: ReactNode;
  children: ReactNode;
  buttons?: ReactNode;
  form: any;
  width?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "full";
}

export function ModalForm({
  open,
  onOpenChange,
  loading,
  error,
  title,
  description,
  footerContent,
  children,
  buttons,
  form,
  width = "lg",
}: FormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formError, setFormError] = useState(error);

  useEffect(() => {
    setFormError(error);
  }, [error]);

  const isLoading = loading || isSubmitting;

  return (
    <AppModal
      title={title}
      description={description}
      open={open}
      onOpenChange={onOpenChange}
      width={width}
      footerContent={footerContent}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-background/50 z-10 flex items-center justify-center rounded-lg">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      )}

      <AppForm
        isLoading={loading || isSubmitting}
        form={form}
        buttons={buttons}
        setIsSubmitting={setIsSubmitting}
      >
        {children}
      </AppForm>

      {formError && (
        <p className="text-sm font-medium text-red-500 my-2">{formError}</p>
      )}
    </AppModal>
  );
}
