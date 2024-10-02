import React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AdminToggleProvider } from "@/context/AdminToggleProvider";

import Sidebar from "@/components/admin/Sidebar";
import FloatingMenu from "@/components/admin/FloatingMenu";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AdminToggleProvider>
      <TooltipProvider>
        <div className="flex min-h-screen w-full bg-[#F1F4FA] p-4 lg:p-8">
          <Sidebar />
          <FloatingMenu />

          <section className="flex w-full flex-1 flex-col">{children}</section>
        </div>
      </TooltipProvider>
    </AdminToggleProvider>
  );
}
