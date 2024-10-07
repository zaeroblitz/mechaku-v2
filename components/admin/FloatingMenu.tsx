"use client";

import React, { useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";

import { adminSidebar } from "@/constants";
import Link from "next/link";
import TooltipIcon from "../shared/utils/TooltipIcon";
import Icon from "./Icon";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export default function FloatingMenu() {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = (index: number | null) => {
    setActiveMenu(activeMenu === index ? null : index);
  };

  const toggleDock = () => {
    setIsOpen(!isOpen);
    setActiveMenu(null);
  };

  return (
    <TooltipProvider>
      <div className="fixed bottom-0 left-1/2 z-50 xl:hidden">
        {/* Toggle */}
        <Button
          onClick={toggleDock}
          className={cn(
            "absolute -translate-x-1/2 bg-transparent text-white hover:text-slate-600 bg-primary p-2 rounded-full",
            "transition-all duration-300 ease-in-out",
            isOpen ? "-top-12" : "top-10"
          )}
        >
          <ChevronUp
            size={24}
            className={cn(
              "transition-all duration-300 ease-in-out",
              isOpen ? "rotate-180" : ""
            )}
          />
        </Button>
        <div
          className={cn(
            "-translate-x-1/2 rounded-2xl bg-primary px-10 py-6 shadow-lg",
            "transition-all duration-300 ease-in-out mb-2",
            isOpen ? "translate-y-0" : "translate-y-full"
          )}
        >
          <div className="flex-center flex gap-6">
            {adminSidebar.map((item, index) => (
              <Link
                key={item.route}
                href={item.children ? "#" : item.route}
                className="relative text-white"
                onClick={() => toggleMenu(index)}
              >
                <>
                  {item.children && (
                    <ChevronUp
                      size={14}
                      className={`absolute -top-4 left-1/2 -translate-x-1/2 transition-transform duration-200 ${activeMenu === index ? "rotate-180" : ""}`}
                    />
                  )}
                  <TooltipIcon
                    classname="bg-[#170645] relative"
                    icon={<Icon name={item.icon} size={24} color="white" />}
                    content={<p>{item.label}</p>}
                  />
                  {activeMenu === index && (
                    <div className="absolute bottom-full left-1/2 mb-8 w-[200px] -translate-x-1/2 rounded-2xl bg-primary p-4 shadow-lg">
                      <div className="flex flex-col gap-4">
                        {item.children &&
                          item.children.map((subItem) => (
                            <Link
                              key={subItem.route}
                              href={subItem.route}
                              className="flex items-center gap-4"
                            >
                              <TooltipIcon
                                classname="ml-10 bg-[#170645]"
                                icon={
                                  <Icon
                                    name={subItem.icon}
                                    size={20}
                                    color="white"
                                  />
                                }
                                content={<p>{subItem.label}</p>}
                              />
                              <p className={`flex-1 text-sm md:text-lg`}>
                                {subItem.label}
                              </p>
                            </Link>
                          ))}
                      </div>
                    </div>
                  )}
                </>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
