// Modules
import React from "react";
import { format } from "date-fns";
import {
  Control,
  FieldValues,
  Path,
  ControllerRenderProps,
} from "react-hook-form";

// Shadcn Components
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

interface DatePickerProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  placeholder: string;
  required?: boolean;
}

export default function DatePicker<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  required = false,
}: DatePickerProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({
        field,
      }: {
        field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>;
      }) => (
        <FormItem className="flex w-full flex-col gap-1">
          <FormLabel className="font-lexend text-form-label">
            {label} {required && <span className="text-form-negative">*</span>}
          </FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full rounded-2xl border border-form-border bg-form-background p-6 font-lexend text-form-input font-normal",
                    !field.value && "text-neutral-400"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>{placeholder}</span>
                  )}
                  <CalendarIcon className="ml-auto size-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              className="w-full rounded-2xl border border-form-border bg-form-background p-2 font-lexend text-form-input"
              align="start"
            >
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date < new Date() || date < new Date("1900-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage className="font-lexend text-form-negative" />
        </FormItem>
      )}
    />
  );
}
