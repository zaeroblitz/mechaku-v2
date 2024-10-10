import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Footer from "@/components/shop/home/Footer";
import Navbar from "@/components/shop/home/Navbar";
import PersonalData from "@/components/shop/my-profile/PersonalData";
import PersonalAddress from "@/components/shop/my-profile/PersonalAddress";

export default function MyProfile() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-8 bg-white md:gap-10 xl:gap-[72px]">
      <Navbar />

      <div className="flex w-full max-w-screen-2xl flex-col gap-8 p-6 md:p-10 xl:p-16">
        <h1 className="font-poppins text-2xl font-bold text-primary lg:text-3xl">
          My Profile
        </h1>

        <div className="flex-center flex">
          <Tabs defaultValue="account" className="flex w-full flex-col gap-5">
            <TabsList className="w-full gap-6 rounded-lg bg-white font-poppins text-primary">
              <TabsTrigger
                className="w-full rounded-lg bg-slate-50 p-2 text-slate-500 data-[state=active]:bg-accent-purple data-[state=active]:text-white"
                value="account"
              >
                Account
              </TabsTrigger>
              <TabsTrigger
                className="w-full rounded-lg bg-slate-50 p-2 text-slate-500 data-[state=active]:bg-accent-purple data-[state=active]:text-white"
                value="address"
              >
                Shopping Address
              </TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <PersonalData />
            </TabsContent>
            <TabsContent value="address">
              <PersonalAddress />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
}
