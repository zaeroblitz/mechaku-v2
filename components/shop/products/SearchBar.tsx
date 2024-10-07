"use client";

// Modules
import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { Heart, Search, ShoppingBag } from "lucide-react";

// Components
import TextInput from "@/components/shared/utils/TextInput";
import { Button } from "@/components/ui/button";

export default function SearchBar() {
  const { status } = useSession();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex w-full flex-col gap-6 lg:flex-row-reverse lg:justify-between">
      {/* Wishlists & Carts */}
      {status === "authenticated" && (
        <div className="flex w-full items-end justify-end gap-3">
          <Link
            href="/wishlists"
            className="flex-center flex h-12 gap-3 rounded-2xl border border-[#ecedf2] bg-white px-4 font-poppins text-xs font-semibold leading-snug text-secondary lg:h-14 lg:px-6 lg:text-sm"
          >
            <Heart size={16} /> <p className="">Wishlists</p>
          </Link>

          <Link
            href="/carts"
            className="flex-center flex h-12 gap-3 rounded-2xl border border-[#ecedf2] bg-white px-4 font-poppins text-xs font-semibold leading-snug text-secondary lg:h-14 lg:px-6 lg:text-sm"
          >
            <ShoppingBag size={16} /> <p className="">Carts</p>{" "}
            <div className="flex-center flex rounded-2xl bg-secondary px-3 py-1.5 text-xs text-white">
              17
            </div>
          </Link>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col gap-2 md:flex-row">
        <TextInput
          placeholder="Find your favourite collection"
          icon={<Search size={16} />}
          onChange={(value) => setSearchQuery(value)}
        />

        <Button className="h-full rounded-2xl bg-accent-purple px-8 text-center font-semibold text-white">
          Search
        </Button>
      </div>
    </div>
  );
}
