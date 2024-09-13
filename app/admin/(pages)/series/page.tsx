import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

import Header from "@/components/admin/Header";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const series = [
  {
    id: 1,
    title: "Gundam",
    description: "Gundam Series",
    author: "Yoshiyuki Tomino",
    image: "/assets/images/gundam.jpg",
  },
  {
    id: 2,
    title: "Zoids",
    description: "Zoids Series",
    author: "Michiro Ueyama",
    image: "/assets/images/zoids.jpg",
  },
  {
    id: 3,
    title: "Pokemon",
    description: "Pokemon Series",
    author: "Satoshi Tajiri",
    image: "/assets/images/pokemon.jpg",
  },
  {
    id: 4,
    title: "Digimon",
    description: "Digimon Series",
    author: "Yuen Wong Yu",
    image: "/assets/images/digimon.png",
  },
];

const Page = () => {
  return (
    <section className="flex w-full flex-1 flex-col">
      <Header title="Series" />
      <main className="mt-10 flex w-full flex-1 flex-col rounded-2xl">
        <div className="mb-10 flex">
          <Link
            href="/admin/series/create"
            className="flex-center flex space-x-2 rounded-full bg-accent-purple px-10 py-3"
          >
            <Plus size={16} color="white" />
            <p className="text-center font-lexend text-white">Add New Series</p>
          </Link>
        </div>

        <div className="flex w-full flex-wrap gap-10">
          {series.map((item) => {
            return (
              <Link
                href={`/admin/series/${item.id}`}
                className="flex-center flex flex-col overflow-hidden rounded-2xl"
                key={item.id}
              >
                <div className="group relative h-auto w-[480px] overflow-hidden rounded-2xl">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={480}
                    height={300}
                    className="rounded-2xl object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent to-[#170645] opacity-100 mix-blend-multiply transition-transform duration-500 group-hover:scale-110" />
                  <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-poppins font-semibold text-white">
                    {item.title}
                  </p>
                  <Badge className="absolute bottom-4 left-4 bg-[#372176fc] font-lexend text-sm font-light text-white">
                    {item.author}
                  </Badge>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </section>
  );
};

export default Page;
