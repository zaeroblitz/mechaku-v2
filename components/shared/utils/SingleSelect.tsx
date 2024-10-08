import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  placeholder: string;
  options?: { value: string; label: string }[];
  width?: number;
  onSelectChange: (value: string) => void;
}

export default function SingleSelect({
  label,
  placeholder,
  options,
  width = 240,
  onSelectChange,
}: Props) {
  const [value, setValue] = useState("");

  return (
    <Select
      onValueChange={(value) => {
        setValue(value);
        onSelectChange(value);
      }}
      defaultValue={value}
    >
      <SelectTrigger
        className={cn(
          "flex h-12 w-full gap-2 rounded-2xl border  border-[#ecedf2] bg-white px-12 py-4 font-poppins text-xs ring-transparent lg:h-14 lg:text-sm",
          width !== 240 ? `md:w-[${width}]px` : "md:w-[240px]"
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="rounded-2xl bg-white p-2 font-poppins text-secondary">
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          <SelectSeparator />
          {options &&
            options.length > 0 &&
            options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}

          {!options ||
            (options.length === 0 && (
              <SelectItem value="">No options available</SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
