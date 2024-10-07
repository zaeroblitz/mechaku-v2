import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

export default function Newsletter() {
  return (
    <div className="flex-center flex w-full max-w-screen-2xl">
      <div className="flex-center relative flex w-full flex-col bg-[#070707] px-5 py-20 md:px-[100px]">
        <div className="flex-center relative z-50 flex flex-col">
          <h6 className="mb-2 text-center font-inter text-3xl font-bold leading-10 text-white md:text-5xl">
            Subscribe To Our Newsletter
          </h6>
          <p className="mb-12 text-center font-inter text-base font-normal leading-relaxed text-neutral-500 md:text-lg">
            Tap yout email down bellow and get the new notifications about
            Mechaku.
          </p>
          <div className="flex w-full max-w-[480px] items-center bg-white px-6 py-3">
            <Input
              type="text"
              placeholder="Add your email here"
              className="mr-10 flex-1 border-none bg-transparent text-sm text-neutral-700 ring-transparent md:text-lg lg:text-xl"
            />

            <Button className="w-fit rounded-none bg-[#070707] px-4 py-3 text-center text-xs font-bold uppercase leading-normal text-white md:px-6 md:text-sm lg:text-base">
              Subscribe
            </Button>
          </div>
        </div>
        <div className="absolute">
          <Image
            src="/assets/images/newsletter-ornament-desktop.svg"
            alt="newsletter-ornament"
            width={1336}
            height={356}
            className="h-[356px] w-[1336px] object-cover"
          />
        </div>
      </div>
    </div>
  );
}
