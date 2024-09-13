import React from "react";
import Header from "@/components/admin/Header";

const Page = () => {
  return (
    <section className="flex w-full flex-1 flex-col">
      <Header title="Dashboard" />
      <div className="flex-1">
        <main className="flex flex-1 p-10">{/* Your Page Content */}</main>
      </div>
    </section>
  );
};

export default Page;
