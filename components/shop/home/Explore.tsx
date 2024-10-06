import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Explore() {
  return (
    <div className="flex-center flex w-full max-w-screen-2xl px-10 2xl:px-[100px]">
      {/* Image on Desktop */}
      <Image
        src="/assets/images/explore-banner.png"
        alt="explore"
        width={580}
        height={420}
        className="mr-[100px] hidden h-[420px] w-[580px] rounded-[32px] object-cover xl:block"
      />

      {/* Image on iPad */}
      <Image
        src="/assets/images/explore-banner.png"
        alt="explore"
        width={554}
        height={420}
        className="mr-20 hidden h-[420px] w-[554px] rounded-[32px] object-cover lg:block xl:hidden"
      />

      {/* Image on Tablet */}
      <Image
        src="/assets/images/explore-banner.png"
        alt="explore"
        width={312}
        height={298}
        className="mr-10 hidden h-[420px] w-[312px] rounded-[32px] object-cover md:block lg:hidden"
      />

      <div className="flex flex-col gap-6 md:gap-8 ">
        <div className="flex flex-col gap-3">
          <h6 className="max-w-[250px] font-poppins text-2xl font-bold text-primary lg:max-w-[290px] lg:text-3xl">
            Explore Your Collection Today
          </h6>
          <p className="max-w-[344px] font-poppins text-sm font-normal leading-loose text-primary">
            Don’t miss out on the latest releases and exclusive offers. Sign up
            for our newsletter and be the first to know about new arrivals and
            special deals.
          </p>
          <Link
            href="/products"
            className="flex-center flex w-fit gap-2 rounded-full border border-primary px-6 py-4 text-primary transition duration-300 hover:bg-slate-50 hover:shadow-2xl hover:shadow-slate-400 md:px-8"
          >
            <p className="font-lexend text-sm font-normal leading-tight text-primary md:text-base">
              Discover All Collection
            </p>
            <ArrowUpRight size={24} />
          </Link>
        </div>
      </div>
    </div>
  );
}
