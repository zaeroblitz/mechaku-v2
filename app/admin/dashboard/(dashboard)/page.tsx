import React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";

import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";

const Page = () => {
  return (
    <TooltipProvider>
      <main className="flex min-h-screen w-full bg-[#F1F4FA] p-8">
        <Sidebar />

        <section className="flex w-full flex-1 flex-col">
          <Header />
        </section>
      </main>
    </TooltipProvider>
  );
};

export default Page;
