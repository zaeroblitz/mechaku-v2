import React, { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { formatToRupiah } from "@/lib/utils";

interface Props {
  label?: string;
  placeholder: string;
  isPrice?: boolean;
  icon?: React.ReactNode;
  onChange: (value: number) => void;
}

export default function NumberInput({
  label,
  placeholder,
  isPrice,
  icon,
  onChange,
}: Props) {
  const [value, setValue] = useState(0);

  const formattedValue = useMemo(() => {
    if (value) {
      return isPrice ? formatToRupiah(value) : value;
    }
    return "";
  }, [value, isPrice]);

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <p className="font-poppins text-xs font-semibold text-neutral-500 lg:text-sm">
          {label}
        </p>
      )}
      <div className="flex h-12 w-full items-center gap-2 rounded-2xl border border-[#ecedf2] bg-white px-6 py-4 font-poppins text-xs md:w-1/2 lg:h-14 lg:w-[240px] lg:text-sm">
        {icon && <span>{icon}</span>}

        <Input
          type="text"
          placeholder={placeholder}
          className="h-fit border-none p-0 ring-transparent placeholder:text-neutral-300"
          value={formattedValue}
          onChange={(e) => {
            const numericValue = e.target.value.replace(/[^\d]/g, "");
            const numberValue = Number(numericValue);

            setValue(numberValue);
            onChange(numberValue);
          }}
        />
      </div>
    </div>
  );
}
