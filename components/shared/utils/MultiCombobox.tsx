"use client";

import React, { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

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
  onChange: (values: string[]) => void;
}

export function MultiCombobox({ name, items, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleSelect = (itemValue: string) => {
    const newSelectedValues = selectedValues.includes(itemValue)
      ? selectedValues.filter((value) => value !== itemValue)
      : [...selectedValues, itemValue];
    setSelectedValues(newSelectedValues);
    onChange(newSelectedValues);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="flex h-12 min-w-[280px] max-w-fit items-center justify-between rounded-2xl border border-[#ecedf2] bg-white px-6 font-poppins text-xs lg:h-14 lg:text-sm"
        >
          <div className="flex gap-0.5">
            {selectedValues.length > 0 ? (
              selectedValues.length > 2 ? (
                <span className="m-1 flex items-center rounded bg-slate-100 px-2 py-1 text-xs">
                  {selectedValues.length} series selected
                </span>
              ) : (
                selectedValues.map((value) => (
                  <span
                    key={value}
                    className="m-1 flex items-center rounded bg-slate-100 px-2 py-1 text-xs"
                  >
                    {items?.find((item) => item.value === value)?.label}
                  </span>
                ))
              )
            ) : (
              <p className="font-normal text-neutral-300">
                Select {name.toLowerCase()}...
              </p>
            )}
          </div>
          <ChevronDown
            size={16}
            className={cn(
              "shrink-0 transition-all duration-300 ease-in-out",
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
                      onSelect={() => handleSelect(item.value)}
                      className="cursor-pointer rounded-2xl p-2 transition duration-300 hover:bg-slate-100"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedValues.includes(item.value)
                            ? "opacity-100"
                            : "opacity-0"
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
