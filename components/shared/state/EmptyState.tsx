import React from "react";
import Image from "next/image";

interface EmptySateProps {
  width?: number;
  height?: number;
  text: string;
}

const EmptyState = ({ width = 300, height = 300, text }: EmptySateProps) => {
  return (
    <div className="flex-center flex size-full flex-col gap-6">
      <Image
        src="/assets/illustrations/empty.png"
        alt="empty"
        width={width}
        height={height}
        className="object-cover"
      />

      <p className="font-lexend text-xl font-bold text-primary">{text}</p>
    </div>
  );
};

export default EmptyState;
