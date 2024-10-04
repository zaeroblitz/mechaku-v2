import React, { useCallback, useState } from "react";
import Image from "next/image";
import { FileUp } from "lucide-react";
import { Control, Controller, Path, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface AvatarUploadProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  required?: boolean;
  defaultImageURL?: string;
}

export default function AvatarUpload<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  required = false,
  defaultImageURL,
}: AvatarUploadProps<TFieldValues>) {
  const { toast } = useToast();
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      onChange: (file: File | null) => void
    ) => {
      const file = e.target.files?.[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          toast({
            variant: "destructive",
            title: "Error",
            description:
              "File size limit exceeded. Please upload a file less than 5MB.",
            className:
              "bg-rose-50 text-rose-500 rounded-2xl border-none font-lexend",
          });
          return;
        }
        if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
          // Handle unsupported file type
          toast({
            variant: "destructive",
            title: "Error",
            description: "Only.jpg,.png, and.webp formats are supported.",
            className:
              "bg-rose-50 text-rose-500 rounded-2xl border-none font-lexend",
          });
          return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result as string); // Set image preview
        };
        reader.readAsDataURL(file); // Convert image file to data URL
        onChange(file); // Set file into react-hook-form state
      }
    },
    [toast]
  );

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-lexend text-form-label">
            {label} {required && <span className="text-form-negative">*</span>}
          </FormLabel>
          <FormControl>
            <>
              {previewImage ? (
                <div className="flex-center group relative mt-4">
                  <Image
                    src={previewImage}
                    alt="Preview"
                    width={250}
                    height={250}
                    className="size-[250px] rounded-full object-cover object-center"
                  />
                  <div className="absolute inset-0 left-1/2 size-[250px] -translate-x-1/2 rounded-full bg-gradient-to-b from-transparent to-[#170645] opacity-0 mix-blend-multiply duration-500 group-hover:opacity-100 group-hover:transition-opacity" />
                  <div className="flex-center absolute flex size-full flex-col font-lexend opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <Input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 z-50 size-full cursor-pointer opacity-0"
                      onChange={(e) => handleImageChange(e, field.onChange)}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                    <h3 className="mt-2 text-sm font-medium text-white">
                      <FormLabel className="flex-center relative flex flex-col">
                        <FileUp size={48} color="#FFFFFF" className="mb-3" />
                        <p>
                          <span>Drag and drop</span>
                          <span className="text-indigo-400"> or browse </span>
                        </p>
                      </FormLabel>
                    </h3>
                    <p className="mt-1 text-xs text-white">
                      PNG, JPG, WEBP up to 5MB
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {defaultImageURL ? (
                    <div className="flex-center group relative mt-4">
                      <Image
                        src={defaultImageURL}
                        alt="Preview"
                        width={680}
                        height={380}
                        className="size-auto rounded-2xl object-cover"
                      />
                      <div className="absolute inset-0 h-auto w-full rounded-2xl bg-gradient-to-b from-transparent to-[#170645] opacity-0 mix-blend-multiply duration-500 group-hover:opacity-100 group-hover:transition-opacity" />
                      <div className="flex-center absolute flex size-full flex-col font-lexend opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        <Input
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 z-50 size-full cursor-pointer opacity-0"
                          onChange={(e) => handleImageChange(e, field.onChange)}
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                        />
                        <h3 className="mt-2 text-sm font-medium text-white">
                          <FormLabel className="flex-center relative flex flex-col">
                            <FileUp
                              size={48}
                              color="#FFFFFF"
                              className="mb-3"
                            />
                            <p>
                              <span>Drag and drop</span>
                              <span className="text-indigo-400">
                                {" "}
                                or browse{" "}
                              </span>
                            </p>
                          </FormLabel>
                        </h3>
                        <p className="mt-1 text-xs text-white">
                          PNG, JPG, WEBP up to 5MB
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-center group relative flex w-full flex-col rounded-2xl border-2 border-dashed border-form-border py-14 font-lexend">
                      <Input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 z-50 size-full cursor-pointer opacity-0"
                        onChange={(e) => handleImageChange(e, field.onChange)}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
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
                      <p className="mt-1 text-xs text-gray-500">
                        PNG, JPG, WEBP up to 5MB
                      </p>
                    </div>
                  )}
                </>
              )}
            </>
          </FormControl>
          <FormMessage className="font-lexend text-form-negative" />
        </FormItem>
      )}
    />
  );
}
