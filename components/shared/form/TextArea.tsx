import React from "react";
import {
  Control,
  FieldValues,
  Path,
  ControllerRenderProps,
} from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

interface TextAreaProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  placeholder: string;
  required?: boolean;
  className?: string;
}

export default function TextArea<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  required = false,
  className = "",
}: TextAreaProps<TFieldValues>) {
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
            <Textarea
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
