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

interface ItemProps {
  value: string;
  label: string;
}

interface Props {
  name: string;
  items?: ItemProps[];
  onChange: (value: string) => void;
}
export function Combobox({ name, items, onChange }: Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="flex h-12 w-[280px] items-center justify-between rounded-2xl border border-[#ecedf2] bg-white px-6 font-poppins text-xs lg:h-14 lg:text-sm"
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
                ? items.map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.label}
                      onSelect={() => {
                        setValue(item.value === value ? "" : item.value);
                        setOpen(false);
                        onChange(item.value);
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
  );
}
