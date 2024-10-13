"use client";

// Modules
import React from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Components
import { Button } from "@/components/ui/button";
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
import { FormLabel } from "@/components/ui/form";

interface ItemProps {
  value: string;
  label: string;
}

interface Props {
  name: string;
  label?: string;
  width?: string;
  required?: boolean;
  items?: ItemProps[];
  onChange: (value: ItemProps) => void;
}
export function Combobox({
  name,
  label,
  width,
  required,
  items,
  onChange,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <FormLabel className="font-lexend text-form-label">
          {label} {required && <span className="text-form-negative">*</span>}
        </FormLabel>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "flex h-12 items-center justify-between rounded-2xl border border-[#ecedf2] bg-white px-6 font-poppins text-xs lg:h-14 lg:text-sm",
              width ? `w-${width}` : " w-[280px]"
            )}
          >
            {value && items && items.length > 0 ? (
              <p>{items.find((item) => item.value === value)?.label}</p>
            ) : (
              <p className="font-normal text-neutral-300">
                Select {name.toLowerCase()}...
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
        </PopoverTrigger>
        <PopoverContent className="w-full rounded-2xl bg-white p-2">
          <Command>
            <CommandInput placeholder={`Search ${name.toLowerCase()}...`} />
            <CommandList>
              <CommandEmpty>No {name.toLowerCase()} found.</CommandEmpty>
              <CommandGroup>
                {items && items.length > 0
                  ? items.map((item, index) => (
                      <CommandItem
                        key={index}
                        value={item.label}
                        onSelect={() => {
                          setValue(item.value === value ? "" : item.value);
                          setOpen(false);
                          onChange(item);
                        }}
                        className="cursor-pointer rounded-2xl p-2 transition duration-300 hover:bg-slate-100"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === item.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {item.label}
                      </CommandItem>
                    ))
                  : null}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
