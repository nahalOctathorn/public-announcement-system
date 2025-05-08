import { MessageResponse } from '@/@types/general.type';
import { useApiMutation } from '@/hooks/use-api-mutation';
import React from 'react';

export interface FormBaseProps<TFormData, TResponse> {
  handleSubmit: (data: TFormData) => Promise<TResponse | MessageResponse | void>;
  isSubmitting: boolean;
  error: string | null;
  isSuccess: boolean;
}

interface FormHandlerProps<TFormData, TResponse, TFormExtraProps> {
  mutationFn: (data: TFormData) => Promise<TResponse | MessageResponse | void>;
  FormComponent: React.ComponentType<FormBaseProps<TFormData, TResponse> & TFormExtraProps>;
  formProps?: TFormExtraProps;
  onSuccess?: (response: TResponse | MessageResponse | void) => void;
  onError?: (error: Error) => void;
}

export function FormHandler<TFormData, TResponse = any, TFormExtraProps = any>({
  mutationFn,
  FormComponent,
  formProps,
  onSuccess,
  onError,
}: FormHandlerProps<TFormData, TResponse, TFormExtraProps>) {
  const { mutateAsync, isPending, error, reset, isSuccess } = useApiMutation(mutationFn, {
    onSuccess,
    onError,
  });

  const handleSubmit = async (formData: TFormData) => {
    try {
      return await mutateAsync(formData);
    } catch (err) {
      throw err;
    }
  };

  return (
    <FormComponent
      handleSubmit={handleSubmit}
      isSubmitting={isPending}
      error={error?.message || null}
      isSuccess={isSuccess}
      {...(formProps as TFormExtraProps)}
    />
  );
}