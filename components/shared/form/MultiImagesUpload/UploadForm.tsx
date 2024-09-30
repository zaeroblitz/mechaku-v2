import React from "react";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { FileUp } from "lucide-react";
import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface UploadFormProps<TFieldValues extends FieldValues> {
  required?: boolean;
  field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function UploadForm<TFieldValues extends FieldValues>({
  required = false,
  field,
  onChange,
}: UploadFormProps<TFieldValues>) {
  return (
    <div className="flex-center relative flex size-full flex-col rounded-2xl border-2 border-dashed border-form-border py-14 font-lexend">
      <Input
        type="file"
        accept="image/*"
        multiple
        className="absolute inset-0 z-50 size-full cursor-pointer  opacity-0"
        onChange={onChange}
        onBlur={field.onBlur}
        name={field.name}
        ref={field.ref}
        required={required}
      />
      <h3 className="mt-2 text-sm font-medium text-gray-900">
        <FormLabel className="flex-center relative flex flex-col">
          <FileUp size={48} color="#6D6D6D" className="mb-3" />
          <p>
            <span>Drag and drop</span>
            <span className="text-indigo-600"> or browse </span>
            <span>to upload</span>
          </p>
        </FormLabel>
      </h3>
      <p className="mt-1 text-xs text-gray-500">PNG, JPG, WEBP up to 5MB</p>
    </div>
  );
}
