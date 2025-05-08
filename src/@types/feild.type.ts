import { ReactNode } from "react";

// types.ts
export type FieldType = 'text' | 'email' | 'textarea' | 'select' | 'password' | 'tel' | 'custom';

export type FieldConfig = {
  id: string;
  label: string;
  name: string;
  type: FieldType;
  placeholder?: string;
  options?: { label: string; value: string }[];
  defaultValue?: string;
  required: boolean;
  startAdornment?:ReactNode;
  endAdornment?:ReactNode;
  bottomAdornment?: ReactNode;
  className?: string;
};
