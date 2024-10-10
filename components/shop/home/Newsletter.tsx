import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

export default function Newsletter() {
  return (
    <section className="flex-center flex w-full max-w-screen-2xl">
      <div className="flex-center relative flex w-full flex-col bg-[#070707] px-3 py-20 sm:px-5 md:px-[100px]">
        <div className="flex-center relative z-50 flex flex-col">
          <h6 className="mb-2 flex flex-col text-center font-inter text-2xl font-bold leading-tight text-white md:flex-row md:gap-2 md:text-3xl lg:text-5xl">
            <span>Subscribe To </span>
            <span>Our Newsletter</span>
          </h6>
          <p className="mb-12 text-center font-inter text-xs font-normal leading-relaxed text-neutral-500 sm:text-base md:text-lg">
            Tap yout email down bellow and get the new notifications about
            Mechaku.
          </p>
          <div className="flex w-full max-w-[480px] items-center bg-white p-1 sm:px-6 sm:py-3">
            <Input
              type="text"
              placeholder="Add your email here"
              className="flex-1 border-none bg-transparent text-xs text-neutral-700 ring-transparent sm:text-sm md:text-lg lg:mr-10 lg:text-xl"
            />

            <Button className="w-fit rounded-none bg-[#070707] p-2 text-center text-xs font-semibold uppercase leading-normal text-white sm:px-4 sm:py-3 md:px-6 md:text-sm lg:text-base">
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
    </section>
  );
}
