"use client";

import React, { useState } from "react";
import { Home, Search, Bell, User, ChevronUp, Menu } from "lucide-react";

const menuItems = [
  {
    icon: Home,
    label: "Beranda",
    subItems: ["Feed", "Trending"],
  },
  {
    icon: Search,
    label: "Cari",
    subItems: ["Pengguna", "Konten", "Tag"],
  },
  {
    icon: Bell,
    label: "Notifikasi",
    subItems: ["Semua", "Mention", "Pesan"],
  },
  {
    icon: User,
    label: "Profil",
    subItems: ["Edit Profil", "Pengaturan", "Keluar"],
  },
];

const FloatingDockMenu = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = (index) => {
    setActiveMenu(activeMenu === index ? null : index);
  };

  const toggleDock = () => {
    setIsOpen(!isOpen);
    setActiveMenu(null); // Close any open submenu when toggling the dock
  };

  return (
    <div className="fixed inset-x-0 bottom-0">
      <button
        onClick={toggleDock}
        className="absolute -top-8 right-4 rounded-full bg-gray-800 p-1 text-white shadow-lg"
      >
        <Menu className="size-6" />
      </button>
      <div
        className={`h-[80px] bg-gray-800 shadow-lg transition-all duration-300 ease-in-out ${isOpen ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="flex items-center justify-around px-2 py-1 sm:py-2">
          {menuItems.map((item, index) => (
            <div key={index} className="relative flex-1">
              <button
                onClick={() => toggleMenu(index)}
                className={`flex w-full flex-col items-center p-1 text-white transition-colors duration-200 hover:bg-gray-700 sm:p-2 ${activeMenu === index ? "bg-gray-700" : ""}`}
              >
                <item.icon className="mb-1 size-5 sm:size-6" />
                <span className="text-[10px] sm:text-xs">{item.label}</span>
                {item.subItems && (
                  <ChevronUp
                    className={`mt-1 size-3 transition-transform duration-200 sm:size-4 ${activeMenu === index ? "rotate-180" : ""}`}
                  />
                )}
              </button>
              {activeMenu === index && (
                <div className="absolute inset-x-0 bottom-full mb-2 overflow-hidden rounded-t-lg bg-gray-800 shadow-lg">
                  {item.subItems.map((subItem, subIndex) => (
                    <button
                      key={subIndex}
                      className="w-full px-4 py-2 text-left text-sm text-white transition-colors duration-200 hover:bg-gray-700"
                    >
                      {subItem}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FloatingDockMenu;
