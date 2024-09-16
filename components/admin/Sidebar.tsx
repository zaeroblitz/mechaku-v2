"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { adminSidebar } from "@/constants";
import Icon from "@/components/shared/Icon";
import TooltipIcon from "@/components/shared/TooltipIcon";

const Sidebar = () => {
  const pathname = usePathname();
  const [isMinimize, setIsMinimize] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMinimize = () => {
    setIsMinimize(!isMinimize);
  };

  if (!mounted) {
    return null; // Prevent rendering until the component has mounted
  }

  return (
    <div className={`${isMinimize ? "w-32" : "w-[320px]"}`}>
      <aside
        className={`
        scrollbar-sidebar-admin fixed inset-y-8 flex-col overflow-y-scroll rounded-3xl bg-primary p-6 font-poppins text-white
        ${isMinimize === false ? "w-[296px]" : "w-fit"}`}
      >
        {/* Logo  */}
        <div
          className={`mb-8 flex items-center ${isMinimize && "flex-center"}`}
        >
          {isMinimize ? (
            <Image
              src="/assets/images/logo.svg"
              width={32}
              height={32}
              alt="logo"
              className="invert-colors size-auto object-contain"
            />
          ) : (
            <Image
              src="/assets/images/logo-text.svg"
              width={160}
              height={48}
              alt="logo"
              className="invert-colors size-auto object-contain"
            />
          )}
        </div>

        {/* Menu */}
        <div className="flex flex-col gap-6">
          <p
            className={`text-sm font-light uppercase text-white ${isMinimize && "flex-center"}`}
          >
            Menu
          </p>
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
                    <AccordionItem value={sidebar.label} className="border-b-0">
                      <AccordionTrigger
                        className={`no-underline hover:no-underline ${isMinimize ? "flex-col space-y-2" : "flex-row"}`}
                      >
                        <div className="flex items-center justify-start">
                          <Link
                            href={sidebar.route}
                            className="flex items-center gap-4"
                          >
                            <TooltipIcon
                              classname="ml-10 bg-[#170645]"
                              icon={
                                <Icon
                                  name={sidebar.icon}
                                  size={24}
                                  color="white"
                                />
                              }
                              content={<p>{sidebar.label}</p>}
                            />
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
                        <div
                          className={`flex-col space-y-4 pt-4 ${isMinimize ? "flex-center pl-0" : "pl-5"}`}
                        >
                          {sidebar.children.map((child) => (
                            <Link
                              key={child.route}
                              href={child.route}
                              className="flex items-center gap-4"
                            >
                              <TooltipIcon
                                classname="ml-10 bg-[#170645]"
                                icon={
                                  <Icon
                                    name={child.icon}
                                    size={20}
                                    color="white"
                                  />
                                }
                                content={<p>{child.label}</p>}
                              />
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
                    className="flex items-center justify-center gap-4"
                  >
                    <TooltipIcon
                      classname="ml-10 bg-[#170645]"
                      icon={
                        <Icon name={sidebar.icon} size={24} color="white" />
                      }
                      content={<p>{sidebar.label}</p>}
                    />
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
          <p
            className={`text-sm font-light uppercase text-white ${isMinimize && "flex-center"}`}
          >
            Other
          </p>
          <div className="w-full items-center justify-between text-lg font-light">
            <div className="flex flex-col gap-5">
              {/* Settings */}
              <Link href="/admin/settings" className="flex-center flex gap-4">
                <TooltipIcon
                  classname="ml-10 bg-[#170645]"
                  icon={<Icon name="Settings" size={24} color="white" />}
                  content={<p>Settings</p>}
                />
                <p
                  className={`flex-1 text-lg font-light ${isMinimize ? "hidden" : "block"}`}
                >
                  Settings
                </p>
              </Link>

              {/* Logout */}
              <Link href="/admin/logout" className="flex-center flex gap-4">
                <TooltipIcon
                  classname="ml-10 bg-[#170645]"
                  icon={<Icon name="LogOut" size={24} color="white" />}
                  content={<p>Logout</p>}
                />
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
        className={`relative right-0 top-0 ${isMinimize ? "ml-32" : "ml-[320px]"}`}
        onClick={handleMinimize}
      >
        <TooltipIcon
          classname="ml-10 bg-[#170645]"
          icon={<Icon name="AlignLeft" size={36} color="#170645" />}
          content={
            <p className="text-white">
              {isMinimize ? "Show Menu" : "Hide Menu"}
            </p>
          }
        />
      </div>
    </div>
  );
};

export default Sidebar;
