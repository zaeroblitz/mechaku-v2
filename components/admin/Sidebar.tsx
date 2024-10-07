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
import Icon from "@/components/admin/Icon";
import TooltipIcon from "@/components/shared/utils/TooltipIcon";
import { useAdminToggle } from "@/context/AdminToggleProvider";
import { signOut, useSession } from "next-auth/react";

const Sidebar = () => {
  const pathname = usePathname();
  const { data } = useSession();
  const [mounted, setMounted] = useState(false);
  const { toggle, setToggle } = useAdminToggle();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Prevent rendering until the component has mounted
  }

  return (
    <div className={`${toggle ? "w-32" : "w-[320px]"} hidden xl:block`}>
      <aside
        className={`scrollbar-sidebar-admin fixed inset-y-8 flex-col overflow-y-scroll rounded-3xl bg-primary p-6 font-poppins text-white
              ${toggle === false ? "w-[296px]" : "w-fit"}`}
      >
        {/* Logo  */}
        <div className={`mb-8 flex items-center ${toggle && "flex-center"}`}>
          {toggle ? (
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
            className={`text-sm font-light uppercase text-white ${toggle && "flex-center"}`}
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
                        className={`no-underline hover:no-underline ${toggle ? "flex-col space-y-2" : "flex-row"}`}
                      >
                        <div className="flex items-center justify-start">
                          <div className="flex items-center gap-4">
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
                                ${toggle ? "hidden" : "block"}`}
                            >
                              {sidebar.label}
                            </p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div
                          className={`relative flex-col space-y-4 pt-4 ${toggle ? "flex-center pl-0" : "pl-5"}`}
                        >
                          {sidebar.children.map((child) => (
                            <div className="relative" key={child.route}>
                              <Link
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
                                    ${toggle ? "hidden" : "block"}`}
                                >
                                  {child.label}
                                </p>
                              </Link>
                              {pathname === child.route && (
                                <div className="absolute -left-3 top-0 h-6 w-1 bg-[#7f6cf3]" />
                              )}
                            </div>
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
                        ${toggle ? "hidden" : "block"}`}
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
            className={`text-sm font-light uppercase text-white ${toggle && "flex-center"}`}
          >
            Other
          </p>
          <div className="w-full items-center justify-between text-lg font-light">
            <div className="flex flex-col gap-5">
              {/* Settings */}
              <Link
                href={`/admin/settings/${data?.user.id}`}
                className="flex-center flex gap-4"
              >
                <TooltipIcon
                  classname="ml-10 bg-[#170645]"
                  icon={<Icon name="Settings" size={24} color="white" />}
                  content={<p>Settings</p>}
                />
                <p
                  className={`flex-1 text-lg font-light ${toggle ? "hidden" : "block"}`}
                >
                  Settings
                </p>
              </Link>

              {/* Logout */}
              <div
                onClick={() =>
                  signOut({
                    callbackUrl: "/admin",
                  })
                }
                className="flex-center flex gap-4 hover:cursor-pointer"
              >
                <TooltipIcon
                  classname="ml-10 bg-[#170645]"
                  icon={<Icon name="LogOut" size={24} color="white" />}
                  content={<p>Logout</p>}
                />
                <p
                  className={`flex-1 text-lg font-light ${toggle ? "hidden" : "block"}`}
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div
        className={`relative right-0 top-0 ${toggle ? "ml-32" : "ml-[320px]"}`}
        onClick={() => setToggle(!toggle)}
      >
        <TooltipIcon
          classname="ml-10 bg-[#170645]"
          icon={<Icon name="AlignLeft" size={36} color="#170645" />}
          content={
            <p className="text-white">{toggle ? "Show Menu" : "Hide Menu"}</p>
          }
        />
      </div>
    </div>
  );
};

export default Sidebar;
