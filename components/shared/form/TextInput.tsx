// Modules
import React, { useEffect, useRef, useState } from "react";
import {
  Control,
  FieldValues,
  Path,
  ControllerRenderProps,
} from "react-hook-form";

// Shadcn Components
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
  icon?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function TextInput<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  icon,
  required = false,
  disabled = false,
  className = "",
}: TextInputProps<TFieldValues>) {
  const [paddingLeft, setPaddingLeft] = useState(20);
  const unitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (unitRef.current) {
      setPaddingLeft(unitRef.current.offsetWidth + 24);
    }
  }, []);

  return (
    <FormField
      control={control}
      name={name}
      render={({
        field,
      }: {
        field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>;
      }) => (
        <FormItem className="w-full">
          <FormLabel className="font-lexend text-form-label">
            {label} {required && <span className="text-form-negative">*</span>}
          </FormLabel>
          <FormControl>
            <div className="relative flex">
              {icon && (
                <div
                  ref={unitRef}
                  className={`flex-center absolute left-1 top-1 flex h-5/6 gap-3 rounded-full bg-neutral-200/50 px-6 font-lexend text-sm text-form-label`}
                >
                  {icon}
                </div>
              )}

              <Input
                type="text"
                required={required}
                disabled={disabled}
                placeholder={placeholder}
                className={`rounded-2xl border border-form-border bg-form-background p-5 font-lexend text-form-input ${className}`}
                style={{ paddingLeft: icon ? `${paddingLeft}px` : "20px" }}
                {...field}
              />
            </div>
          </FormControl>
          <FormMessage className="font-lexend text-form-negative" />
        </FormItem>
      )}
    />
  );
}
