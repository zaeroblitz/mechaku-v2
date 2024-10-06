import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { series } from "@/constants";

export default function Series() {
  return (
    <div className="my-10 flex max-w-screen-2xl flex-col gap-20 px-[40px] lg:my-0 2xl:px-[100px]">
      <div className="relative overflow-hidden">
        {/* Left gradient overlay */}
        <div className="absolute left-0 top-0 z-10 h-full w-[200px] bg-gradient-to-r from-white to-transparent" />

        {/* Right gradient overlay */}
        <div className="absolute right-0 top-0 z-10 h-full w-[200px] bg-gradient-to-l from-white to-transparent" />

        <Marquee speed={30} direction="left">
          {series.map((series) => (
            <div key={series.path} className="mx-12 lg:mx-16">
              <Image
                src={series.path}
                alt={series.label}
                width={0}
                height={50}
                className="size-auto h-[50px] object-cover"
              />
            </div>
          ))}
        </Marquee>
      </div>

      <div className="relative overflow-hidden">
        {/* Left gradient overlay */}
        <div className="absolute left-0 top-0 z-10 h-full w-[200px] bg-gradient-to-r from-white to-transparent" />

        {/* Right gradient overlay */}
        <div className="absolute right-0 top-0 z-10 h-full w-[200px] bg-gradient-to-l from-white to-transparent" />

        <Marquee speed={30} direction="right">
          {series.map((series) => (
            <div key={series.path} className="mx-12 lg:mx-16">
              <Image
                src={series.path}
                alt={series.label}
                width={0}
                height={50}
                className="size-auto h-[50px] object-cover"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
