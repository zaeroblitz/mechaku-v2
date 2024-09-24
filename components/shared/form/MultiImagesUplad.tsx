// Modules
import React, { useCallback, useState } from "react";
import { Control, Controller, Path, FieldValues } from "react-hook-form";
import Image from "next/image";

// Icons
import { FileUp } from "lucide-react";

// Shadcn Components
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface MultiImagesUploadProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  required?: boolean;
  defaultImageURLs?: string[];
}

export default function MultiImagesUpload<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  required = false,
  defaultImageURLs,
}: MultiImagesUploadProps<TFieldValues>) {
  const { toast } = useToast();
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleImageChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      onChange: (files: FileList | undefined) => void
    ) => {
      const files = e.target.files;
      if (files && files.length) {
        const invalidFiles: string[] = [];
        const validFiles: File[] = [];
        const imageURLs: string[] = [];

        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          if (file.size > 5 * 1024 * 1024) {
            invalidFiles.push(file.name);
          } else if (
            !["image/jpeg", "image/png", "image/webp"].includes(file.type)
          ) {
            invalidFiles.push(file.name);
          } else {
            validFiles.push(file);
          }
        }

        if (invalidFiles.length > 0) {
          toast({
            variant: "destructive",
            title: "Error",
            description: `Invalid files: ${invalidFiles.join(", ")}. Please upload files less than 5MB and in supported formats (.jpg, .png, .webp).`,
          });
          return;
        }

        validFiles.forEach((file) => {
          const reader = new FileReader();

          reader.onloadend = () => {
            if (reader.result) {
              imageURLs.push(reader.result as string);
              // Update preview images only when all files have been processed
              if (imageURLs.length === validFiles.length) {
                setPreviewImages(imageURLs);

                // Convert File[] to FileList using DataTransfer
                const dataTransfer = new DataTransfer();
                validFiles.forEach((file) => dataTransfer.items.add(file));

                // Pass FileList to onChange
                onChange(dataTransfer.files);
              }
            }
          };

          reader.readAsDataURL(file);
        });
      } else {
        onChange(undefined);
        setPreviewImages([]);
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
              {previewImages.length > 0 ? (
                <div className="flex-center mt-4 flex-col gap-6">
                  <div className="flex-center relative flex w-full flex-col rounded-2xl border-2 border-dashed border-form-border py-14 font-lexend">
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
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
                  <div className="flex w-full flex-1 flex-col gap-3">
                    <FormLabel className="font-lexend text-form-label">
                      Images Preview:
                    </FormLabel>
                    <div className="flex w-full flex-wrap gap-4">
                      {previewImages.map((url, index) => (
                        <Image
                          key={index}
                          src={url}
                          alt="Preview"
                          width={200}
                          height={200}
                          className="rounded-2xl object-cover"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {defaultImageURLs && defaultImageURLs.length > 0 ? (
                    <div className="flex-center mt-4 flex-col gap-6">
                      <div className="flex-center relative flex w-full flex-col rounded-2xl border-2 border-dashed border-form-border py-14 font-lexend">
                        <Input
                          type="file"
                          accept="image/*"
                          multiple
                          className="absolute inset-0 z-50 size-full cursor-pointer opacity-0"
                          onChange={(e) => handleImageChange(e, field.onChange)}
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                        />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">
                          <FormLabel className="flex-center relative flex flex-col">
                            <FileUp
                              size={48}
                              color="#6D6D6D"
                              className="mb-3"
                            />
                            <p>
                              <span>Drag and drop</span>
                              <span className="text-indigo-600">
                                {" "}
                                or browse{" "}
                              </span>
                              <span>to upload</span>
                            </p>
                          </FormLabel>
                        </h3>
                        <p className="mt-1 text-xs text-gray-500">
                          PNG, JPG, WEBP up to 5MB
                        </p>
                      </div>
                      <div className="flex w-full flex-1 flex-col gap-3">
                        <FormLabel className="font-lexend text-form-label">
                          Previous Images:
                        </FormLabel>
                        {defaultImageURLs.map((url, index) => (
                          <Image
                            key={index}
                            src={url}
                            alt="Previous Images"
                            width={200}
                            height={200}
                            className="rounded-2xl object-cover"
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex-center relative flex w-full flex-col rounded-2xl border-2 border-dashed border-form-border py-14 font-lexend">
                      <Input
                        type="file"
                        accept="image/*"
                        multiple
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
