import Image from "next/image";
import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="flex-center flex w-full bg-[#070707] p-5 px-10 md:p-8 lg:p-12 2xl:p-20  2xl:px-[100px]">
      <div className="flex w-full max-w-screen-2xl flex-col">
        <div className="flex w-full flex-col items-start border-b border-[#323232] pb-12 lg:flex-row lg:justify-between">
          <div className="mb-8 mr-0 flex flex-col md:mr-12 lg:mb-0 xl:gap-6 2xl:mr-auto">
            <Image
              src="/assets/images/logo-text-white.svg"
              alt="logo"
              width={164}
              height={32}
              className="mb-3 h-8 w-[164px] object-contain lg:mb-0"
            />

            <p className="max-w-[432px] font-inter text-xs font-normal leading-snug text-white/80 md:text-sm">
              At <span className="font-bold">Mechaku</span>, we’re more than
              just a store—we’re a community of enthusiasts. That’s why we
              carefully curate our selection to offer only the best, from
              trusted brands to exclusive releases.
            </p>
          </div>

          <div className="flex flex-wrap items-start gap-12 lg:gap-[20px] 2xl:gap-[120px]">
            <MenuItem
              title="shop"
              items={["Gundam", "Zoids", "Digimon", "Pokemon", "Action Figure"]}
            />

            <MenuItem
              title="help"
              items={["Contact", "FAQ", "Shipping & Return", "Privacy Policy"]}
            />

            <MenuItem
              title="about"
              items={[
                "Just Arrived",
                "Customization",
                "Shop by Look",
                "About Mechaku",
              ]}
            />
          </div>
        </div>

        <div className="pt-12">
          <p className="text-center font-inter text-xs font-normal leading-relaxed text-white/80 sm:text-base">{`@${year} Mechaku`}</p>
        </div>
      </div>
    </footer>
  );
}

interface MenuItemProps {
  title: string;
  items: string[];
}

function MenuItem({ title, items }: MenuItemProps) {
  return (
    <div className="flex flex-col gap-2 md:gap-4">
      <h6 className="font-poppins text-lg font-normal uppercase leading-normal text-white md:text-xl lg:text-2xl">
        {title}
      </h6>
      {items.map((item) => (
        <div key={item} className="flex flex-col gap-2">
          <p className="font-inter text-xs font-normal leading-relaxed text-white/80 md:text-sm lg:text-base">
            {item}
          </p>
        </div>
      ))}
    </div>
  );
}
