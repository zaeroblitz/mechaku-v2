"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { adminSidebar } from "@/constants";
import Icon from "@/components/shared/Icon";

const Sidebar = () => {
  const pathname = usePathname();
  const [isMinimize, setIsMinimize] = useState(false);

  const handleMinimize = () => {
    setIsMinimize(!isMinimize);
  };

  return (
    <TooltipProvider>
      <div className="flex w-fit">
        <aside
          className={`
        scrollbar-sidebar-admin fixed inset-y-8 flex-col overflow-y-scroll rounded-3xl bg-[#170645] p-6 font-poppins text-white
        ${isMinimize === false ? "w-[296px]" : "w-fit"}`}
        >
          {/* Logo  */}
          <div className="mb-8 flex items-center">
            {isMinimize ? (
              <Image
                src="/assets/images/logo.svg"
                width={32}
                height={32}
                alt="logo"
                className="invert-colors object-contain"
              />
            ) : (
              <Image
                src="/assets/images/logo-text.svg"
                width={160}
                height={48}
                alt="logo"
                className="invert-colors object-contain"
              />
            )}
          </div>

          {/* Menu */}
          <div className="flex flex-col gap-6">
            <p className="text-sm font-light uppercase text-white">Menu</p>
            <div className="flex flex-col items-start gap-5 space-x-0">
              {adminSidebar.map((sidebar) => (
                <div
                  key={sidebar.label}
                  className="relative w-full items-start justify-between text-lg font-light"
                >
                  {/* Highlight if active */}
                  {pathname === sidebar.route && (
                    <div className="absolute -left-6 h-6 w-1 bg-[#7f6cf3]" />
                  )}

                  {sidebar.children ? (
                    <Accordion type="multiple">
                      <AccordionItem
                        value={sidebar.label}
                        className="border-b-0"
                      >
                        <AccordionTrigger className="no-underline hover:no-underline">
                          <div className="flex items-center justify-start">
                            <Link
                              href={sidebar.route}
                              className="flex items-center gap-4"
                            >
                              <Tooltip>
                                <TooltipTrigger>
                                  <Icon
                                    name={sidebar.icon}
                                    size={24}
                                    color="white"
                                  />
                                </TooltipTrigger>

                                <TooltipContent
                                  className="ml-10 bg-[#170645]"
                                  side="bottom"
                                >
                                  <p>{sidebar.label}</p>
                                </TooltipContent>
                              </Tooltip>
                              <p
                                className={`flex-1 text-lg 
                                ${pathname === sidebar.route ? "font-bold" : "font-light"}
                                ${isMinimize ? "hidden" : "block"}`}
                              >
                                {sidebar.label}
                              </p>
                            </Link>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="flex-col space-y-4 pl-5 pt-4">
                            {sidebar.children.map((child) => (
                              <Link
                                key={child.route}
                                href={child.route}
                                className="flex items-center gap-4"
                              >
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Icon
                                      name={child.icon}
                                      size={20}
                                      color="white"
                                    />
                                  </TooltipTrigger>

                                  <TooltipContent
                                    className="ml-10 bg-[#170645]"
                                    side="bottom"
                                  >
                                    <p>{child.label}</p>
                                  </TooltipContent>
                                </Tooltip>
                                <p
                                  className={`flex-1 text-base 
                                    ${pathname === child.route ? "font-medium" : "font-light"}
                                    ${isMinimize ? "hidden" : "block"}`}
                                >
                                  {child.label}
                                </p>
                              </Link>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    <Link
                      href={sidebar.route}
                      className="flex items-center gap-4"
                    >
                      <Tooltip>
                        <TooltipTrigger>
                          <Icon name={sidebar.icon} size={24} color="white" />
                        </TooltipTrigger>

                        <TooltipContent
                          className="ml-10 bg-[#170645]"
                          side="bottom"
                        >
                          <p>{sidebar.label}</p>
                        </TooltipContent>
                      </Tooltip>
                      <p
                        className={`flex-1 text-lg 
                        ${pathname === sidebar.route ? "font-bold" : "font-light"}
                        ${isMinimize ? "hidden" : "block"}`}
                      >
                        {sidebar.label}
                      </p>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          <hr className="my-10 border-white/25" />

          {/* Other */}
          <div className="flex flex-col gap-6">
            <p className="text-sm font-light uppercase text-white">Other</p>
            <div className="w-full items-center justify-between text-lg font-light">
              <div className="flex flex-col gap-5">
                <Link href="/admin/settings" className="flex gap-4">
                  <Tooltip>
                    <TooltipTrigger>
                      <Icon name="Settings" size={24} color="white" />
                    </TooltipTrigger>

                    <TooltipContent
                      className="ml-10 bg-[#170645]"
                      side="bottom"
                    >
                      <p>Settings</p>
                    </TooltipContent>
                  </Tooltip>
                  <p
                    className={`flex-1 text-lg font-light ${isMinimize ? "hidden" : "block"}`}
                  >
                    Settings
                  </p>
                </Link>

                <Link href="/admin/logout" className="flex gap-4">
                  <Tooltip>
                    <TooltipTrigger>
                      <Icon name="LogOut" size={24} color="white" />
                    </TooltipTrigger>

                    <TooltipContent
                      className="ml-10 bg-[#170645]"
                      side="bottom"
                    >
                      <p>Logout</p>
                    </TooltipContent>
                  </Tooltip>
                  <p
                    className={`flex-1 text-lg font-light ${isMinimize ? "hidden" : "block"}`}
                  >
                    Logout
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </aside>

        <div
          className={`${isMinimize ? "ml-32" : "ml-[320px]"}`}
          onClick={handleMinimize}
        >
          <Tooltip>
            <TooltipTrigger>
              <Icon name="AlignLeft" size={36} color="#170645" />
            </TooltipTrigger>

            <TooltipContent
              className="ml-10 rounded-xl border-2 border-white bg-[#170645]"
              side="bottom"
            >
              <p className="text-white">
                {isMinimize ? "Show Menu" : "Hide Menu"}
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Sidebar;
