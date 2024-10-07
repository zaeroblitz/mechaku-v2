import React from "react";
import { Input } from "@/components/ui/input";

interface Props {
  label?: string;
  placeholder: string;
  icon?: React.ReactNode;
  onChange: (value: string) => void;
}

export default function TextInput({
  label,
  placeholder,
  icon,
  onChange,
}: Props) {
  return (
    <div className="flex flex-col">
      {label && (
        <p className="text-xs font-semibold text-neutral-500">{label}</p>
      )}
      <div className="flex h-12 w-full items-center gap-2 rounded-2xl border border-[#ecedf2] bg-white px-6 py-4 font-poppins text-xs md:w-[420px] lg:h-14 lg:text-sm">
        {icon && <span>{icon}</span>}

        <Input
          type="text"
          placeholder={placeholder}
          className="h-fit rounded-none border-none p-0 ring-transparent placeholder:text-neutral-300"
          onChange={(e) => onChange(e.target.value as string)}
        />
      </div>
    </div>
  );
}
