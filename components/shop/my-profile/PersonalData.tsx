"use client";

import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
import UpdateProfile from "./UpdateProfile";
import UpdatePassword from "./UpdatePassword";
import { useGetUserByIdQuery } from "@/services/user";

export default function PersonalData() {
  const { data: session } = useSession();
  const { data: user, isLoading } = useGetUserByIdQuery(session?.user.id);

  if (isLoading) {
    return (
      <div className="flex w-full flex-col gap-6 rounded-2xl bg-slate-50 p-8 lg:w-1/2 lg:p-10">
        <div className="flex-center flex w-full">
          <Skeleton className="size-[200px] rounded-full bg-slate-200 object-cover" />
        </div>

        <div className="flex flex-col gap-1">
          <Skeleton className="h-[12px] w-[120px] bg-slate-200" />
          <Skeleton className="h-[24px] w-[200px] bg-slate-200" />
        </div>
        <div className="flex flex-col gap-1">
          <Skeleton className="h-[12px] w-[120px] bg-slate-200" />
          <Skeleton className="h-[24px] w-[200px] bg-slate-200" />
        </div>
        <div className="flex flex-col gap-1">
          <Skeleton className="h-[12px] w-[120px] bg-slate-200" />
          <Skeleton className="h-[24px] w-[200px] bg-slate-200" />
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex w-full flex-col gap-6 rounded-2xl bg-slate-50 p-8 lg:w-1/2 lg:p-10">
        <div className="flex w-full justify-end gap-3">
          <UpdateProfile
            id={user.data.id}
            name={user.data.name}
            email={user.data.email}
            phoneNumber={user.data.phone_number}
          />

          <UpdatePassword id={user.data.id} />
        </div>

        <h2 className="font-poppins text-xl font-bold text-primary">
          Personal Information
        </h2>

        <div className="flex flex-col gap-3">
          <div className="flex-center flex w-full">
            <Image
              src={user.data.avatar}
              alt="avatar"
              width={200}
              height={200}
              className="size-[200px] rounded-full object-cover"
            />
          </div>
          <PersonalItem label="Name" value={user.data.name} />
          <PersonalItem label="Email Address" value={user.data.email} />
          <PersonalItem label="Phone Number" value={user.data.phone_number} />
        </div>
      </div>
    );
  }
}

interface PersonalItemProps {
  label: string;
  value: string | null | undefined;
}

function PersonalItem({ label, value }: PersonalItemProps) {
  return (
    <div className="flex flex-col font-inter">
      <div className="flex flex-col gap-2">
        <label className="text-xs text-form-label lg:text-sm">{label}</label>
        <p className="text-sm font-semibold text-secondary lg:text-base">
          {value}
        </p>
      </div>
    </div>
  );
}
