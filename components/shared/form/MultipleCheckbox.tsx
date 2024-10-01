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

interface OptionsProps {
  id: string;
  label: string;
}

interface MultipleCheckboxProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  required?: boolean;
  options: OptionsProps[];
}

export default function MultipleCheckbox<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  required = false,
  options,
}: MultipleCheckboxProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <div className="mb-4">
            <FormLabel className="font-lexend text-form-label">
              {label}{" "}
              {required && <span className="text-form-negative">*</span>}
            </FormLabel>
          </div>
          {options.map((item) => (
            <FormField
              key={item.id}
              control={control}
              name={name}
              render={({ field }) => {
                return (
                  <FormItem
                    key={item.id}
                    className="flex flex-row items-start space-x-3 space-y-0"
                  >
                    <FormControl>
                      <Checkbox
                        required={required}
                        checked={field.value?.includes(item.id)}
                        onCheckedChange={(checked) => {
                          const updatedPermissions = checked
                            ? [...(field.value || []), item.id]
                            : field.value?.filter(
                                (value: string) => value !== item.id
                              );

                          return field.onChange(updatedPermissions);
                        }}
                        className="size-5 rounded-md border border-slate-200 data-[state=checked]:bg-accent-purple text-violet-50"
                      />
                    </FormControl>
                    <FormLabel className="font-normal">{item.label}</FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}
          <FormMessage className="font-lexend text-form-negative" />
        </FormItem>
      )}
    />
  );
}
