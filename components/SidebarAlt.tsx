"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Settings, User, ChevronDown, ChevronRight } from "lucide-react";

const MenuItem = ({ item, pathname, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasSubItems = item.subItems && item.subItems.length > 0;

  const toggleSubMenu = (e) => {
    if (hasSubItems) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  return (
    <li>
      <Link
        href={item.path}
        className={`flex items-center rounded-lg p-2 hover:bg-gray-700 ${
          pathname === item.path ? "bg-gray-700" : ""
        }`}
        style={{ paddingLeft: `${level * 1}rem` }}
        onClick={toggleSubMenu}
      >
        {item.icon && <item.icon className="mr-3 size-5" />}
        <span>{item.label}</span>
        {hasSubItems && (
          <span className="ml-auto">
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
        )}
      </Link>
      {hasSubItems && isOpen && (
        <ul className="mt-2">
          {item.subItems.map((subItem) => (
            <MenuItem
              key={subItem.path}
              item={subItem}
              pathname={pathname}
              level={level + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

const SidebarAlt = () => {
  const pathname = usePathname();

  const menuItems = [
    { icon: Home, label: "Beranda", path: "/" },
    {
      icon: User,
      label: "Profil",
      path: "/profile",
      subItems: [
        { label: "Informasi Pribadi", path: "/profile/info" },
        { label: "Ubah Password", path: "/profile/change-password" },
      ],
    },
    { icon: Settings, label: "Pengaturan", path: "/settings" },
  ];

  return (
    <aside className="h-screen w-64 bg-gray-800 p-4 text-white">
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <MenuItem key={item.path} item={item} pathname={pathname} />
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SidebarAlt;
