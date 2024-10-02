"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { Search, Bell } from "lucide-react";

import TooltipIcon from "@/components/shared/TooltipIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const { data } = useSession();

  return (
    <div className="flex flex-col-reverse justify-between gap-3 xl:ml-14 xl:flex-row">
      <h1 className="font-poppins text-2xl font-bold leading-10 text-[#18120f] lg:text-3xl">
        {title}
      </h1>

      <div className="flex flex-1 items-center justify-end space-x-5">
        <div className="flex space-x-4">
          <TooltipIcon
            icon={<Search size={24} color="#6D6D6D" />}
            content={<p className="text-[#18120f]">Search</p>}
          />
          <TooltipIcon
            icon={<Bell size={24} color="#6D6D6D" />}
            content={<p className="text-[#18120f]">Notifications</p>}
            classname="mr-10"
          />
        </div>

        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>ADM</AvatarFallback>
          </Avatar>

          <div className="flex flex-col space-y-0">
            <p className="font-lexend text-base font-semibold text-[#18120f]">
              {data?.user.username}
            </p>
            <p className="font-lexend text-sm text-form-icon">
              {data?.user.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
