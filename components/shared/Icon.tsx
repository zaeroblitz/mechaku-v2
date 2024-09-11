import React from "react";
import {
  icons,
  LayoutDashboard,
  Film,
  Tag,
  Sparkle,
  Box,
  TicketPercent,
  Shield,
  Settings,
  LogOut,
  Bookmark,
  ShoppingBag,
  Wallet,
  CreditCard,
  Coins,
  Banknote,
  CircleDollarSign,
  HandCoins,
  Users,
  AlignLeft,
} from "lucide-react";

export const selectedIcons = {
  LayoutDashboard,
  Film,
  Tag,
  Sparkle,
  Box,
  TicketPercent,
  Shield,
  Settings,
  LogOut,
  Bookmark,
  ShoppingBag,
  Wallet,
  CreditCard,
  Coins,
  Banknote,
  CircleDollarSign,
  HandCoins,
  Users,
  AlignLeft,
};

type IconName = keyof typeof selectedIcons;

interface IconProps {
  name: IconName;
  size: number;
  color?: string;
}

const Icon = ({ name, size, color }: IconProps) => {
  const LucideIcon = icons[name];

  return <LucideIcon color={color} size={size} />;
};

export default Icon;
