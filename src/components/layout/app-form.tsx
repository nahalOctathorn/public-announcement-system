import { ReactNode, useState, useCallback } from "react";
import { Loader2 } from "lucide-react";

interface FormProps {
  isLoading?: boolean;
  children: ReactNode;
  buttons?: ReactNode;
  form: any;
  isSubmitting?: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void
}

export function AppForm({
  isLoading,
  children, 
  buttons,
  form,
  setIsSubmitting,
}: FormProps) {

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (isLoading) return;

      setIsSubmitting(true);
      try {
        await form.handleSubmit();
      } finally {
        setIsSubmitting(false);
      }
    },
    [form]
  );


  return (
    <div className="relative">
      

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          {children}

          <div className="space-y-4">
            {buttons && (
              <div className="flex flex-col md:flex-row gap-2 justify-end">
                {buttons}
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
