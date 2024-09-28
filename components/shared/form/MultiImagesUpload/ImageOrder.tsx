// Modules
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

// Icons
import { Save, X } from "lucide-react";

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

// Utils
import { IProductImage } from "@/services/products";

// Components
import { ImagePreview } from "./ImagePreview";
import { useToast } from "@/hooks/use-toast";

// Query
import { useUpdateProductImageOrderMutation } from "@/services/product-images";

interface ImageOrderProps {
  productId: string;
  images: IProductImage[];
  onClose: () => void;
}

const ImageOrder: React.FC<ImageOrderProps> = ({
  productId,
  images,
  onClose,
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const [productImages, setProductImages] = useState(images);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const [updateProductImageOrder, { isLoading }] =
    useUpdateProductImageOrderMutation();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalContentRef.current &&
        !modalContentRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleDragEndImages = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setProductImages((previewImages) => {
        const oldIndex = previewImages.findIndex(
          (item) => item.displayOrder === active.id
        );
        const newIndex = previewImages.findIndex(
          (item) => item.displayOrder === over.id
        );
        const newPreviewImages = arrayMove(previewImages, oldIndex, newIndex);

        return newPreviewImages;
      });
    }
  };

  const handleSave = async () => {
    try {
      await updateProductImageOrder({ images: productImages });

      toast({
        title: "Success!",
        description: "Image order saved successfully.",
        className: "rounded-xl bg-emerald-50 text-emerald-800",
      });

      router.push(`/admin/products/${productId}`);
    } catch (error) {
      toast({
        title: "Error",
        description:
          "An error occurred while saving the image order. Please try again later.",
        className: "rounded-xl bg-pink-50 text-pink-800",
      });
    } finally {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex select-none items-center justify-center bg-black/70">
      <div
        ref={modalContentRef}
        className="relative max-w-screen-md rounded-3xl bg-white p-10"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -right-2 -top-2 rounded-xl bg-rose-50 p-2 text-center text-rose-500 transition duration-300 hover:bg-rose-500 hover:text-rose-50"
        >
          <X size={24} />
        </button>

        <h1 className="mb-6 text-center font-poppins text-2xl font-bold text-primary">
          Arrage Product Images
        </h1>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={(event) => handleDragEndImages(event)}
        >
          <SortableContext
            items={productImages.map((image) => image.displayOrder)}
            strategy={verticalListSortingStrategy}
          >
            <div className="flex w-full flex-wrap justify-center gap-6 rounded-2xl border-4 border-dashed border-neutral-200 p-6">
              {productImages.map((image, index) => (
                <>
                  <ImagePreview
                    key={image.displayOrder}
                    index={image.displayOrder}
                    url={image.imageUrl}
                    order={index}
                  />
                </>
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {/* Save Button */}
        <div className="flex-center mt-6 flex">
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="flex-center flex w-full gap-2 rounded-2xl bg-purple-50 px-6 py-3 text-accent-purple transition duration-300 hover:bg-accent-purple hover:text-purple-50 disabled:bg-accent-purple/50"
          >
            <Save size={16} />
            <p className="font-lexend font-bold">
              {isLoading ? "Updating image order..." : "Save Images Order"}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageOrder;
