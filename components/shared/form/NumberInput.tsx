// Modu;es
import React, { useEffect, useRef, useState } from "react";
import {
  Control,
  FieldValues,
  Path,
  ControllerRenderProps,
} from "react-hook-form";

// Shadcn Components
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Libraries
import { formatToRupiah } from "@/lib/utils";

interface NumberInputProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  placeholder: string;
  unit?: string;
  unitPosition?: "left" | "right";
  icon?: React.ReactNode;
  required?: boolean;
  isPrice?: boolean;
  className?: string;
}

export default function NumberInput<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  unit,
  unitPosition = "left",
  placeholder,
  icon,
  required = false,
  isPrice,
  className = "",
}: NumberInputProps<TFieldValues>) {
  const [leftPadding, setLeftPadding] = useState(20);
  const [rightPadding, setRightPadding] = useState(20);
  const unitRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const [formattedValue, setFormattedValue] = useState("");

  useEffect(() => {
    if (unitRef.current && iconRef.current) {
      setLeftPadding(unitRef.current.offsetWidth + 24);
      setRightPadding(iconRef.current.offsetWidth + 24);
    }

    if (unitRef.current) {
      if (unitPosition === "left") {
        setLeftPadding(unitRef.current.offsetWidth + 24);
      } else {
        setRightPadding(unitRef.current.offsetWidth + 24);
      }
    }

    if (iconRef.current) {
      if (unitPosition === "left") {
        setRightPadding(iconRef.current.offsetWidth + 24);
      } else {
        setLeftPadding(iconRef.current.offsetWidth + 24);
      }
    }
  }, [unit, icon, unitPosition]);

  return (
    <FormField
      control={control}
      name={name}
      render={({
        field,
      }: {
        field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>;
      }) => {
        if (field.value) {
          if (isPrice) {
            setFormattedValue(formatToRupiah(field.value.toString()));
          } else {
            setFormattedValue(field.value.toString());
          }
        }

        return (
          <FormItem className="w-full">
            <FormLabel className="font-lexend text-form-label">
              {label}{" "}
              {required && <span className="text-form-negative">*</span>}
            </FormLabel>
            <FormControl>
              <div className={`flex ${(unit || icon) && "relative"}`}>
                {unit && (
                  <div
                    ref={unitRef}
                    className={`flex-center absolute top-1 flex h-5/6 gap-3 rounded-full bg-neutral-200/50 px-6 font-lexend text-sm text-form-label ${unitPosition === "left" ? "left-1" : "right-1"}`}
                  >
                    {unit}
                  </div>
                )}

                {icon && (
                  <div
                    ref={iconRef}
                    className={`flex-center absolute top-1 flex h-5/6 gap-3 rounded-full bg-neutral-200/50 px-6 font-lexend text-sm text-form-label ${unitPosition === "left" ? "right-1" : "left-1"}`}
                  >
                    {icon}
                  </div>
                )}

                <Input
                  type="text"
                  placeholder={placeholder}
                  className={`rounded-2xl border border-form-border bg-form-background p-5 font-lexend text-form-input ${className}`}
                  style={{
                    paddingLeft: `${leftPadding}px`,
                    paddingRight: `${rightPadding}px`,
                  }}
                  {...field}
                  value={formattedValue}
                  onChange={(e) => {
                    const numericValue = e.target.value.replace(/[^\d]/g, "");
                    const numberValue = Number(numericValue);

                    if (isPrice) {
                      setFormattedValue(formatToRupiah(numberValue));
                    } else {
                      setFormattedValue(numericValue);
                    }

                    field.onChange(numberValue);
                  }}
                />
              </div>
            </FormControl>
            <FormMessage className="font-lexend text-form-negative" />
          </FormItem>
        );
      }}
    />
  );
}
