// Modules
import React, { useState } from "react";
import {
  Control,
  FieldValues,
  Path,
  ControllerRenderProps,
} from "react-hook-form";

// Icons
import { CheckIcon, ChevronsUpDownIcon, XIcon } from "lucide-react";

// Shadcn Components
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";

// Libraries
import { cn } from "@/lib/utils";

interface DropdownItems {
  label: string;
  value: string;
}

interface DropdownProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  options: DropdownItems[];
  icon?: React.ReactNode;
  required?: boolean;
  placeholder: string;
  onSelect: (value: string) => void;
  className?: string;
}

export default function Dropdown<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  options,
  icon,
  required = false,
  placeholder,
  onSelect,
  className,
}: DropdownProps<TFieldValues>) {
  const [open, setOpen] = useState(false);

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
            <div className="flex w-full">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between rounded-2xl border border-form-border bg-form-background p-5 font-lexend text-form-input",
                        !field.value && "text-neutral-400"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        {icon}
                        <span>
                          {field.value
                            ? options.find(
                                (option) => option.value === field.value
                              )?.label
                            : placeholder}
                        </span>
                      </div>
                      <ChevronsUpDownIcon className="ml-2 size-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="rounded-2xl border border-form-border bg-form-background p-2 font-lexend text-form-input">
                  <Command>
                    <CommandInput
                      placeholder={`Search ${label.toLowerCase()}...`}
                    />
                    <CommandList>
                      <CommandEmpty>
                        No {label.toLowerCase()} found.
                      </CommandEmpty>
                      <CommandGroup>
                        <CommandItem
                          value=""
                          className="text-neutral-400"
                          onSelect={() => {
                            onSelect("");
                            setOpen(false);
                          }}
                        >
                          <XIcon className="mr-2 size-4 " />
                          Clear selected {label.toLowerCase()}
                        </CommandItem>
                        {options.map((option) => (
                          <CommandItem
                            value={option.label}
                            key={option.value}
                            onSelect={() => {
                              onSelect(option.value);
                              setOpen(false);
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                option.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {option.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </FormControl>
          <FormMessage className="font-lexend text-form-negative" />
        </FormItem>
      )}
    />
  );
}
