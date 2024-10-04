// Modules
import React from "react";
import {
  Control,
  FieldValues,
  Path,
  ControllerRenderProps,
} from "react-hook-form";

// Shadcn Components
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

interface OptionProps {
  value: string;
  label: string;
}

interface RadioButtonProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label?: string;
  options: OptionProps[];
  defaultValue: string;
  direction?: string;
}

export default function RadioButton<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  options,
  defaultValue,
  direction = "horizontal",
}: RadioButtonProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({
        field,
      }: {
        field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>;
      }) => (
        <FormItem className="w-full font-lexend">
          <FormLabel className="font-lexend text-form-label">{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value || defaultValue}
              className={cn(
                "flex gap-2",
                direction === "horizontal"
                  ? "flex-row justify-between"
                  : "flex-col"
              )}
            >
              {options.map((option) => (
                <FormItem
                  key={option.value}
                  className="flex items-center space-x-2 space-y-0"
                >
                  <FormControl>
                    <RadioGroupItem
                      value={option.value}
                      className="flex-center flex size-4 border border-slate-200 text-accent-purple"
                    />
                  </FormControl>
                  <FormLabel className="font-normal">{option.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage className="font-lexend text-form-negative" />
        </FormItem>
      )}
    />
  );
}
