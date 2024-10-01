// Modules
import React, { useMemo } from "react";
import {
  Control,
  FieldValues,
  Path,
  ControllerRenderProps,
  useWatch,
} from "react-hook-form";

// Shadcn Components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface OptionsProps {
  label: string;
  value: string;
}

interface SingleSelectProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  placeholder: string;
  options: OptionsProps[];
  required?: boolean;
  className?: string;
  defaultValue?: string;
}

export default function SingleSelect<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  options,
  required = false,
  className = "",
  defaultValue,
}: SingleSelectProps<TFieldValues>) {
  const fieldValue = useWatch({
    control,
    name,
  });

  const value = useMemo(() => {
    if (fieldValue) {
      return fieldValue;
    }

    return defaultValue;
  }, [fieldValue, defaultValue]);

  return (
    <FormField
      control={control}
      name={name}
      render={({
        field,
      }: {
        field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>;
      }) => {
        return (
          <FormItem className="w-full">
            <FormLabel className="font-lexend text-form-label">
              {label}{" "}
              {required && <span className="text-form-negative">*</span>}
            </FormLabel>
            <FormControl>
              <div className="flex">
                <Select onValueChange={field.onChange} defaultValue={value}>
                  <FormControl>
                    <SelectTrigger
                      className={`rounded-2xl border border-form-border bg-form-background p-5 font-lexend text-form-input ${className}`}
                    >
                      <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="rounded-2xl border border-form-border bg-form-background p-2 font-lexend text-form-input">
                    {options.map((item, index) => (
                      <SelectItem key={index} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </FormControl>
            <FormMessage className="font-lexend text-form-negative" />
          </FormItem>
        );
      }}
    />
  );
}
