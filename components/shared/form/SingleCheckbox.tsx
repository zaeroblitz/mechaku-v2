// Modules
import React from "react";
import { Control, FieldValues, Path } from "react-hook-form";

// Shadcn Components
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

interface SingleCheckboxProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  required?: boolean;
}

export default function SingleCheckbox<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  required = false,
}: SingleCheckboxProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <FormField
            control={control}
            name={name}
            render={({ field }) => {
              return (
                <FormItem className="flex flex-row-reverse items-center justify-end gap-2 space-y-0">
                  <FormLabel className="w-fit font-lexend text-form-label">
                    {label}
                  </FormLabel>
                  <FormControl>
                    <Checkbox
                      required={required}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="size-4 rounded-md border border-slate-200 text-violet-50 data-[state=checked]:bg-accent-purple lg:size-5"
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <FormMessage className="font-lexend text-form-negative" />
        </FormItem>
      )}
    />
  );
}
