import React from "react";
import Image from "next/image";

interface ErrorStateProps {
  width?: number;
  height?: number;
  text: string;
}

const ErrorState = ({ width = 300, height = 300, text }: ErrorStateProps) => {
  return (
    <div className="flex-center flex size-full flex-col gap-6">
      <Image
        src="/assets/illustrations/corrupt.png"
        alt="error"
        width={width}
        height={height}
        className="object-cover"
      />

      <p className="font-lexend text-xl font-bold text-primary">{text}</p>
    </div>
  );
};

export default ErrorState;
