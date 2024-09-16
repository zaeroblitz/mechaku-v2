import React from "react";
import {
  Control,
  FieldValues,
  Path,
  ControllerRenderProps,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface TextInputProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  placeholder: string;
  required?: boolean;
  className?: string;
}

export default function TextInput<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  required = false,
  className = "",
}: TextInputProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({
        field,
      }: {
        field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>;
      }) => (
        <FormItem>
          <FormLabel className="font-lexend text-form-label">
            {label} {required && <span className="text-form-negative">*</span>}
          </FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder={placeholder}
              className={`rounded-2xl border border-form-border bg-form-background p-5 font-lexend text-form-input ${className}`}
              {...field}
            />
          </FormControl>
          <FormMessage className="font-lexend text-form-negative" />
        </FormItem>
      )}
    />
  );
}
