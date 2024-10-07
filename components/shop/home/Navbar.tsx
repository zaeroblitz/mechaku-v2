"use client";

// Modules
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

// Icons
import { Search, ShoppingBag } from "lucide-react";

// Shadcn Components
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Libraries
import { cn } from "@/lib/utils";
import { shopPages } from "@/constants";

export default function Navbar() {
  const pathname = usePathname();
  const { data, status } = useSession();

  return (
    <div className="flex-center sticky flex w-full max-w-screen-2xl items-center rounded-b-[48px] border border-slate-100 bg-white px-[40px] py-5 shadow-2xl shadow-slate-50 2xl:px-[100px]">
      {/* Logo */}
      <Image
        src="/assets/images/logo-text.svg"
        alt="logo"
        width={164}
        height={32}
        className="object-contain"
      />

      <NavigationMenu className="mx-auto hidden lg:block">
        <NavigationMenuList className="flex-center flex gap-10">
          {shopPages.map((page) => (
            <NavigationMenuItem key={page.path}>
              <Link href={page.path} legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    "transition-all duration-300 ease-in-out",
                    pathname === page.path
                      ? "shop-header-active"
                      : "shop-header-default",
                    pathname === page.path && "border-b-2 border-accent-purple"
                  )}
                >
                  {page.name.toUpperCase()}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="hidden items-center gap-4 lg:flex">
        {/* Search */}
        <Button className="flex-center flex gap-3 rounded-full border border-slate-100 bg-white px-8 py-3 text-form-label transition duration-300 hover:border-slate-200 hover:bg-slate-50">
          <Search size={16} />
          <p className="font-poppins text-sm font-medium leading-snug">
            Search
          </p>
        </Button>

        {/* Sign In */}
        {status === "unauthenticated" && (
          <Link
            href="/auth/sign-in"
            className="flex-center flex w-[148px] gap-3 rounded-full border border-primary bg-primary px-12 py-2 text-white transition duration-300 hover:bg-primary/90 hover:shadow-2xl hover:shadow-primary/80"
          >
            <p className="font-poppins text-sm font-medium leading-snug">
              Sign In
            </p>
          </Link>
        )}

        {/* Carts & Profile */}
        {status === "authenticated" && (
          <div className="flex items-center gap-4">
            <Button className="flex-center flex gap-3 rounded-full border border-slate-100 bg-white px-8 py-3 text-form-label transition duration-300 hover:border-slate-200 hover:bg-slate-50">
              <ShoppingBag size={16} />
              <p className="font-poppins text-sm font-medium leading-snug">
                Carts
              </p>
              <div className="flex-center flex h-6 w-8 rounded-full bg-secondary text-center font-poppins text-xs font-bold text-white">
                19
              </div>
            </Button>

            <Avatar className="cursor-pointer">
              <AvatarImage
                src={data.user.avatar}
                alt="avatar"
                className="bg-slate-300"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
    </div>
  );
}
