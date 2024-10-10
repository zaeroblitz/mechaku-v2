import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Explore() {
  return (
    <section className="flex-center flex w-full px-10 2xl:px-[100px]">
      <div className="flex-center flex w-full max-w-screen-2xl">
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
            <h6 className="flex w-full flex-col font-poppins text-xl font-bold text-primary sm:text-2xl lg:max-w-[290px] lg:text-3xl">
              <span>Explore Your</span>
              <span>Collection Today</span>
            </h6>
            <p className="max-w-[344px] font-poppins text-xs font-normal leading-loose text-primary sm:text-sm">
              Don’t miss out on the latest releases and exclusive offers. Sign
              up for our newsletter and be the first to know about new arrivals
              and special deals.
            </p>
            <Link
              href="/products"
              className="flex-center flex w-full gap-2 rounded-full border border-primary px-4 py-3 text-primary transition duration-300 hover:bg-slate-50 hover:shadow-2xl hover:shadow-slate-400 sm:w-fit sm:px-8 sm:py-4"
            >
              <p className="font-lexend text-xs font-normal leading-tight text-primary sm:text-base">
                Discover All Collection
              </p>
              <ArrowUpRight size={24} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
