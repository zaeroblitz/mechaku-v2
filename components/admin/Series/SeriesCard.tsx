import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ISeries } from "@/services/series";

const SeriesCard = ({ item }: { item: ISeries }) => {
  return (
    <Link
      href={`/admin/series/${item.id}`}
      className="flex-center flex flex-col overflow-hidden rounded-2xl"
    >
      <div className="group relative h-auto w-[480px] overflow-hidden rounded-2xl">
        <Image
          src={item.image}
          alt={item.title}
          width={420}
          height={300}
          className="size-auto rounded-2xl object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent to-[#170645] opacity-100 mix-blend-multiply transition-transform duration-500 group-hover:scale-110" />
        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-poppins font-semibold text-white">
          {item.title}
        </p>
        {item.author && (
          <div className="absolute bottom-4 left-10 rounded-lg bg-[#372176fc] px-2 py-1 font-lexend text-sm font-light text-white sm:left-4">
            {item.author}
          </div>
        )}
      </div>
    </Link>
  );
};

export default SeriesCard;
