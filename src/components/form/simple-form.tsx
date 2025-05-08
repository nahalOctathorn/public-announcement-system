import { cn } from "@/lib/utils";
import { ReactNode, useState, useEffect, useMemo } from "react";
import { AppForm } from "../layout/app-form";
import { Loader2 } from "lucide-react";

interface FormProps {
  className?: string;
  loading?: boolean;
  error?: string | null;
  children: ReactNode;
  buttons?: ReactNode;
  form: any;
}

export function SimpleForm({
  className,
  loading,
  error,
  children,
  buttons,
  form,
}: FormProps) {
  const [formError, setFormError] = useState(error);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormError(error);
  }, [error]);

  const isLoading = loading || isSubmitting;

  return (
    <div className={cn("relative flex flex-col gap-6", className)}>
      {isLoading && (
        <div className="absolute inset-0 bg-background/50 z-10 flex items-center justify-center rounded-lg">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      )}

      <AppForm
        isLoading={isLoading}
        form={form}
        buttons={buttons}
        setIsSubmitting={setIsSubmitting}
      >
        {children}
      </AppForm>
      {formError && (
        <p className="text-sm font-medium text-red-500 my-2">{formError}</p>
      )}
    </div>
  );
}
