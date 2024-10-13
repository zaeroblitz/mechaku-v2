import React, { useState, useEffect } from "react";
import {
  Control,
  FieldValues,
  Path,
  ControllerRenderProps,
  useWatch,
} from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react";

interface OptionsProps {
  label: string;
  value: string;
}

interface ComboBoxProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  placeholder: string;
  options?: OptionsProps[];
  width: string;
  required?: boolean;
  className?: string;
  defaultValue?: string;
  onChange: (value: string) => void;
}

export default function ComboBox<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  options,
  width,
  required = false,
  className = "",
  defaultValue,
  onChange,
}: ComboBoxProps<TFieldValues>) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    defaultValue
  );

  const fieldValue = useWatch({
    control,
    name,
  });

  useEffect(() => {
    setSelectedValue(fieldValue || defaultValue);
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
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                      "flex h-12 items-center justify-between rounded-2xl border border-[#ecedf2] bg-white px-6 font-poppins text-xs lg:h-14 lg:text-sm",
                      width ? `w-${width}` : " w-[280px]"
                    )}
                  >
                    {selectedValue && options && options.length > 0 ? (
                      <p>
                        {
                          options.find(
                            (option) => option.value === selectedValue
                          )?.label
                        }
                      </p>
                    ) : (
                      <p className="font-normal text-neutral-300">
                        {placeholder}
                      </p>
                    )}

                    <ChevronDown
                      size={16}
                      className={cn(
                        "transition-all duration-300 ease-in-out",
                        open ? "rotate-180" : ""
                      )}
                    />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-full rounded-2xl bg-white p-2">
                <Command>
                  <CommandInput placeholder="Search..." />
                  <CommandList>
                    <CommandEmpty>No {name.toLowerCase()} found.</CommandEmpty>
                    <CommandGroup>
                      {options && options.length > 0
                        ? options.map((option, index) => (
                            <CommandItem
                              key={index}
                              value={option.label}
                              onSelect={() => {
                                field.onChange(option.value);
                                setSelectedValue(option.value);
                                onChange(option.value);
                                setOpen(false);
                              }}
                              className="cursor-pointer rounded-2xl p-2 transition duration-300 hover:bg-slate-100"
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedValue === option.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {option.label}
                            </CommandItem>
                          ))
                        : null}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage className="font-lexend text-form-negative" />
          </FormItem>
        );
      }}
    />
  );
}
