import React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";

import Sidebar from "@/components/admin/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full bg-[#F1F4FA] p-8">
        <Sidebar />

        <section className="flex w-full flex-1 flex-col">{children}</section>
      </div>
    </TooltipProvider>
  );
};

export default Layout;
