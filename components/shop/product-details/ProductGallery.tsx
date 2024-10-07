import React, { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUrlProps {
  id: string;
  url: string;
  alt: string;
}

interface Props {
  imageUrls: ImageUrlProps[];
}

export default function ProductGallery({ imageUrls }: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 500;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex-center flex flex-col gap-8">
      {/* Image Preview */}
      <div className="relative select-none rounded-3xl border border-slate-100 p-8">
        <Image
          src={imageUrls[currentImageIndex].url}
          alt={imageUrls[currentImageIndex].alt}
          width={500}
          height={500}
          className="size-auto max-h-[320px] max-w-[320px] rounded-2xl object-contain md:max-h-[600px] md:max-w-[600px] lg:max-h-[500px] lg:max-w-[500px]"
        />

        {/* Left Button */}
        <div
          className="flex-center absolute -left-4 top-1/2 flex size-10 -translate-y-1/2 cursor-pointer rounded-2xl border border-slate-200 text-slate-400 hover:bg-slate-50"
          onClick={() => {
            if (currentImageIndex > 0) {
              setCurrentImageIndex(currentImageIndex - 1);
            } else {
              setCurrentImageIndex(imageUrls.length - 1);
            }
          }}
        >
          <ChevronLeft size={24} />
        </div>

        {/* Right Button */}
        <div
          className="flex-center absolute -right-4 top-1/2 flex size-10 -translate-y-1/2 cursor-pointer rounded-2xl border border-slate-200 text-slate-400 hover:bg-slate-50"
          onClick={() => {
            if (currentImageIndex < imageUrls.length - 1) {
              setCurrentImageIndex(currentImageIndex + 1);
            } else {
              setCurrentImageIndex(0);
            }
          }}
        >
          <ChevronRight size={24} />
        </div>
      </div>

      {/* All Images */}
      <div className="relative select-none rounded-2xl border border-slate-100 p-4">
        <div
          className="flex max-w-[320px] gap-3 overflow-hidden lg:max-w-[500px]"
          ref={scrollRef}
        >
          {imageUrls.map((image, index) => (
            <Image
              key={image.id}
              src={image.url}
              alt={image.alt}
              width={80}
              height={80}
              className={cn(
                "size-20 rounded-2xl object-cover cursor-pointer",
                index === currentImageIndex &&
                  "border-4 border-accent-purple duration-500 transition"
              )}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>

        {/* Left Button */}
        <button
          className={cn(
            "absolute -left-10 top-1/2 -translate-y-1/2 rounded-md bg-white p-2 shadow-lg",
            imageUrls.length < 6 && "lg:hidden",
            imageUrls.length < 4 && "hidden lg:hidden"
          )}
          onClick={() => scroll("left")}
        >
          ←
        </button>
        {/* Left Button */}
        <button
          className={cn(
            "absolute -right-10 top-1/2 -translate-y-1/2 rounded-md bg-white p-2 shadow-lg",
            imageUrls.length < 6 && "lg:hidden",
            imageUrls.length < 4 && "hidden lg:hidden"
          )}
          onClick={() => scroll("right")}
        >
          →
        </button>
      </div>
    </div>
  );
}
