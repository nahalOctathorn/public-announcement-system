import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReactNode, useState, useEffect } from "react";
import { AppForm } from "../layout/app-form";
import { Loader2 } from "lucide-react";

interface FormProps {
  className?: string;
  loading?: boolean;
  error?: string | null;
  title: string;
  description?: string;
  footerContent?: ReactNode;
  children: ReactNode;
  buttons?: ReactNode;
  form: any;
}

export function CardForm({
  className,
  loading,
  error,
  title,
  description,
  footerContent,
  children,
  buttons,
  form,
}: FormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formError, setFormError] = useState(error);

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
      <Card>
        {isLoading && (
          <div className="absolute inset-0 bg-background/50 z-10 flex items-center justify-center rounded-lg">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        )}

        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
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
        </CardContent>
        <CardFooter className="gap-1">{footerContent}</CardFooter>
      </Card>
    </div>
  );
}
