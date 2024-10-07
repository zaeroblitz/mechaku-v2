import Image from "next/image";
import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="w-full max-w-screen-2xl">
      <div className="flex flex-col bg-[#070707] p-5 px-10 md:p-8 lg:p-12 2xl:p-20  2xl:px-[100px]">
        <div className="flex flex-col items-start border-b border-[#323232] pb-12 lg:flex-row">
          <div className="mb-8 mr-0 flex flex-col md:mr-12 lg:mb-0 xl:gap-6 2xl:mr-auto">
            <Image
              src="/assets/images/logo-text-white.svg"
              alt="logo"
              width={164}
              height={32}
              className="mb-3 h-8 w-[164px] object-contain lg:mb-0"
            />

            <p className="max-w-[432px] font-inter text-sm font-normal leading-snug text-white/80">
              At <span className="font-bold">Mechaku</span>, we’re more than
              just a store—we’re a community of enthusiasts. That’s why we
              carefully curate our selection to offer only the best, from
              trusted brands to exclusive releases.
            </p>
          </div>

          <div className="flex flex-wrap items-start gap-12 lg:gap-[82px] 2xl:gap-[120px]">
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
          <p className="font-inter text-base font-normal leading-relaxed text-white/80">{`@${year} Mechaku`}</p>
        </div>
      </div>
    </div>
  );
}

interface MenuItemProps {
  title: string;
  items: string[];
}

function MenuItem({ title, items }: MenuItemProps) {
  return (
    <div className="flex flex-col gap-4">
      <h6 className="font-poppins text-2xl font-normal uppercase leading-normal text-white">
        {title}
      </h6>
      {items.map((item) => (
        <div key={item} className="flex flex-col gap-2">
          <p className="font-inter text-base font-normal leading-relaxed text-white/80">
            {item}
          </p>
        </div>
      ))}
    </div>
  );
}
