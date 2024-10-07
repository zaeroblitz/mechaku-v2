import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageModalProps {
  images: {
    imageUrl: string;
    altText: string;
    isPrimary: boolean;
  }[];
  initialImageIndex: number;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  images,
  initialImageIndex,
  onClose,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(initialImageIndex);
  const modalContentRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="fixed inset-0 z-50 flex select-none items-center justify-center bg-black/50">
      <div
        ref={modalContentRef}
        className="relative max-w-screen-md rounded-3xl bg-white p-10"
      >
        <div
          className="absolute -left-2 top-1/2 -translate-y-1/2 cursor-pointer text-accent-purple"
          onClick={() => {
            if (currentImageIndex > 0) {
              setCurrentImageIndex(currentImageIndex - 1);
            } else {
              setCurrentImageIndex(images.length - 1);
            }
          }}
        >
          <ChevronLeft size={48} />
        </div>
        <div
          className="absolute -right-2 top-1/2 -translate-y-1/2 cursor-pointer text-accent-purple"
          onClick={() => {
            if (currentImageIndex < images.length - 1) {
              setCurrentImageIndex(currentImageIndex + 1);
            } else {
              setCurrentImageIndex(0);
            }
          }}
        >
          <ChevronRight size={48} />
        </div>
        <button
          onClick={onClose}
          className="absolute -right-2 -top-2 rounded-xl bg-rose-50 p-2 text-center text-rose-500 transition duration-300 hover:bg-rose-500 hover:text-rose-50"
        >
          <X size={24} />
        </button>
        <div className="mb-4">
          <Image
            src={images[currentImageIndex].imageUrl}
            alt={images[currentImageIndex].altText}
            width={500}
            height={500}
            className="h-auto w-full rounded-2xl object-contain"
          />
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {images.map((image, index) => (
            <div key={index} onClick={() => setCurrentImageIndex(index)}>
              <Image
                src={image.imageUrl}
                alt={image.altText}
                width={80}
                height={80}
                className={cn(
                  "cursor-pointer rounded-lg object-cover",
                  index === currentImageIndex &&
                    "border-4 border-accent-purple duration-500 transition rounded-2xl"
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
