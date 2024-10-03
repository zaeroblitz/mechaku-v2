// Modules
import React, { useEffect, useRef, useState } from "react";
import {
  Control,
  FieldValues,
  Path,
  ControllerRenderProps,
} from "react-hook-form";

// Icons
import { Lock, Eye, EyeOff } from "lucide-react";

// Shadcn Components
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface PasswordProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  placeholder: string;
  required?: boolean;
  className?: string;
}

export default function Password<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  required = true,
  className = "",
}: PasswordProps<TFieldValues>) {
  const [paddingLeft, setPaddingLeft] = useState(20);
  const [paddingRight, setPaddingRight] = useState(20);
  const [showPassword, setShowPassword] = useState(false);
  const lockIconRef = useRef<HTMLDivElement>(null);
  const eyeIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lockIconRef.current) {
      setPaddingLeft(lockIconRef.current.offsetWidth + 24);
    }

    if (eyeIconRef.current) {
      setPaddingRight(eyeIconRef.current.offsetWidth + 24);
    }
  }, []);

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
            <div className="relative flex">
              <div
                ref={lockIconRef}
                className={
                  "flex-center absolute left-1 top-1 flex h-5/6 gap-3 rounded-full bg-neutral-200/50 px-6 font-lexend text-sm text-form-label"
                }
              >
                <Lock size={14} />
              </div>

              <Input
                required={required}
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                className={`rounded-2xl border border-form-border bg-form-background p-5 font-lexend text-form-input ${className}`}
                style={{
                  paddingLeft: `${paddingLeft}px`,
                  paddingRight: `${paddingRight}px`,
                }}
                {...field}
              />

              <div
                ref={eyeIconRef}
                className={
                  "flex-center absolute right-1 top-1 flex h-5/6 select-none gap-3 rounded-full bg-neutral-200/50 px-6 font-lexend text-sm text-form-label"
                }
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </div>
            </div>
          </FormControl>
          <FormMessage className="font-lexend text-form-negative" />
        </FormItem>
      )}
    />
  );
}
