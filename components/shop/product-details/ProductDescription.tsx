import React from "react";

interface Props {
  description: string;
}

export default function ProductDescription({ description }: Props) {
  return (
    <div className="flex select-none flex-col gap-4">
      <div className="mb-1 w-fit border-b-2 border-accent-purple">
        <p className="font-poppins text-base font-medium text-accent-purple md:text-lg">
          Description
        </p>
      </div>
      <p className="font-inter text-sm text-secondary lg:text-base ">
        {description}
      </p>
    </div>
  );
}
