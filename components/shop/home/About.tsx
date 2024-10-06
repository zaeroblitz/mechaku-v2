import { ShieldCheck, ShoppingBag, Star } from "lucide-react";
import React from "react";

export default function About() {
  return (
    <div className="flex-center my-10 flex flex-col gap-20 px-10 lg:my-20 lg:flex-row lg:gap-12 lg:px-[100px] 2xl:my-[100px]">
      <Item
        icon={<Star size={32} className="text-primary" />}
        title="Exclusive"
        text="Discover Limited Edition Action Figures, Only Available Here!"
      />

      <Item
        icon={<ShoppingBag size={32} className="text-primary" />}
        title="Free Shipping"
        text="Free all shipping worldwide, with applicable conditions"
      />

      <Item
        icon={<ShieldCheck size={32} className="text-primary" />}
        title="Secure Payments"
        text="Payments with a guaranteed level of security"
      />
    </div>
  );
}

interface ItemProps {
  icon: React.ReactNode;
  title: string;
  text: string;
}

function Item({ icon, title, text }: ItemProps) {
  return (
    <>
      <div className="flex-center flex max-w-[276px] flex-col gap-5">
        <span>{icon}</span>
        <h4 className="text-center font-lexend text-2xl font-bold leading-9 text-primary">
          {title}
        </h4>
        <p className="text-center font-poppins text-base font-normal leading-normal text-accent-gray-alt">
          {text}
        </p>
      </div>

      <div className="hidden h-24 border border-neutral-100 last:hidden lg:block" />
    </>
  );
}
