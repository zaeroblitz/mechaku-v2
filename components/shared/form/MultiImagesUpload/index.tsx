// Modules
import React, { useCallback, useState } from "react";
import { Control, Controller, Path, FieldValues } from "react-hook-form";

// Shadcn Components
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

// dnd-kit
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

// Custom Components
import { UploadForm } from "./UploadForm";
import { ImagePreview } from "./ImagePreview";
import { DefaultImage } from "./DefaultImage";
import { IProductImage } from "@/services/products";
import ImageOrder from "./ImageOrder";

// Icons
import { Settings2 } from "lucide-react";

interface MultiImagesUploadProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  required?: boolean;
  defaultImageURLs?: IProductImage[];
}

interface PreviewImageProps {
  url: string;
  index: number;
}

export default function MultiImagesUpload<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  required = false,
  defaultImageURLs,
}: MultiImagesUploadProps<TFieldValues>) {
  const { toast } = useToast();
  const [previewImages, setPreviewImages] = useState<PreviewImageProps[]>([]);
  const [defaultImages, setDefaultImages] = useState<
    IProductImage[] | undefined
  >(defaultImageURLs);
  const [validFiles, setValidFiles] = useState<File[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleImageChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      onChange: (files: FileList | undefined) => void
    ) => {
      const files = e.target.files;
      if (files && files.length) {
        const invalidFiles: string[] = [];
        const newValidFiles: File[] = [];
        const imageURLs: PreviewImageProps[] = [];

        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          if (file.size > 5 * 1024 * 1024) {
            invalidFiles.push(file.name);
          } else if (
            !["image/jpeg", "image/png", "image/webp"].includes(file.type)
          ) {
            invalidFiles.push(file.name);
          } else {
            newValidFiles.push(file);
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

        setValidFiles(newValidFiles); // Save valid files for future reference

        newValidFiles.forEach((file, index) => {
          const reader = new FileReader();

          reader.onloadend = () => {
            if (reader.result) {
              imageURLs.push({
                url: reader.result as string,
                index: index + 1,
              });

              if (imageURLs.length === newValidFiles.length) {
                setPreviewImages(imageURLs);

                const dataTransfer = new DataTransfer();
                newValidFiles.forEach((file) => dataTransfer.items.add(file));

                onChange(dataTransfer.files);
              }
            }
          };

          reader.readAsDataURL(file);
        });
      } else {
        onChange(undefined);
        setPreviewImages([]);
        setValidFiles([]); // Clear valid files when there are no files
      }
    },
    [toast]
  );

  const handleDragEndImages = (
    event: any,
    fieldOnChange: (files: FileList) => void
  ) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setPreviewImages((previewImages) => {
        const oldIndex = previewImages.findIndex(
          (item) => item.index === active.id
        );
        const newIndex = previewImages.findIndex(
          (item) => item.index === over.id
        );
        const newPreviewImages = arrayMove(previewImages, oldIndex, newIndex);

        // Create a new FileList based on the new order of previewImages
        const dataTransfer = new DataTransfer();
        newPreviewImages.forEach((preview) => {
          // Find the original file that matches the preview image
          const file = validFiles[preview.index - 1];
          if (file) {
            dataTransfer.items.add(file);
          }
        });

        // Call field.onChange with the new FileList
        fieldOnChange(dataTransfer.files);

        return newPreviewImages;
      });
    }
  };

  const handleImageDelete = (deletedImageId: string) => {
    setDefaultImages((prevImages) =>
      prevImages?.filter((img) => img.id !== deletedImageId)
    );
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <>
            <FormItem>
              {defaultImageURLs && defaultImageURLs.length > 0 && (
                <div className="flex w-full items-center justify-end">
                  <div
                    onClick={() => setIsModalOpen(true)}
                    className="flex w-fit items-center gap-2 rounded-2xl bg-orange-50 px-6 py-3 text-orange-500 transition duration-300 hover:cursor-pointer hover:bg-orange-500 hover:text-orange-50"
                  >
                    <Settings2 width={14} />
                    <p className="font-lexend font-bold">Arrange Images</p>
                  </div>
                </div>
              )}
              <FormLabel className="font-lexend text-form-label">
                {label}{" "}
                {required && <span className="text-form-negative">*</span>}
              </FormLabel>
              <FormControl>
                <div className="flex-center mt-4 flex-col gap-6">
                  <UploadForm
                    required={required}
                    field={field}
                    onChange={(e) => handleImageChange(e, field.onChange)}
                  />

                  {defaultImages && defaultImages.length > 0 && (
                    <div className="flex w-full flex-1 flex-col gap-3">
                      <FormLabel className="font-lexend text-form-label">
                        <div className="flex w-full justify-between">
                          Images:
                        </div>
                      </FormLabel>
                      <div className="flex flex-wrap gap-4">
                        {defaultImages?.map((image, index) => (
                          <DefaultImage
                            key={index}
                            url={image.imageUrl}
                            imageId={image.id}
                            productId={image.productId}
                            onImageDelete={handleImageDelete}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {previewImages.length > 0 && (
                    <div className="flex w-full flex-1 flex-col gap-3">
                      <FormLabel className="flex flex-col gap-1 font-lexend text-form-label">
                        New Images Preview:
                        <span className="italic text-neutral-400/75">
                          (drag and drop to rearrange)
                        </span>
                      </FormLabel>

                      <div className="flex w-full flex-wrap gap-4">
                        <DndContext
                          sensors={sensors}
                          collisionDetection={closestCenter}
                          onDragEnd={(event) =>
                            handleDragEndImages(event, field.onChange)
                          }
                        >
                          <SortableContext
                            items={previewImages.map((image) => image.index)}
                            strategy={verticalListSortingStrategy}
                          >
                            {previewImages.map((image, index) => (
                              <>
                                <ImagePreview
                                  key={image.index}
                                  index={image.index}
                                  url={image.url}
                                  order={index}
                                />
                              </>
                            ))}
                          </SortableContext>
                        </DndContext>
                      </div>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage className="font-lexend text-form-negative" />
            </FormItem>

            {defaultImageURLs && defaultImageURLs.length > 0 && isModalOpen && (
              <ImageOrder
                productId={defaultImageURLs[0].productId}
                images={defaultImageURLs}
                onClose={() => setIsModalOpen(false)}
              />
            )}
          </>
        );
      }}
    />
  );
}
