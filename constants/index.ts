import { SidebarLink } from "@/types";

export const adminSidebar: SidebarLink[] = [
  {
    icon: "LayoutDashboard",
    label: "Dashboard",
    route: "/admin/dashboard",
  },
  {
    icon: "Box",
    label: "Products",
    route: "products",
    children: [
      {
        icon: "Film",
        label: "Series",
        route: "/admin/series",
      },
      {
        icon: "Tag",
        label: "Brands",
        route: "/admin/brands",
      },
      {
        icon: "Sparkle",
        label: "Grades",
        route: "/admin/grades",
      },
      {
        icon: "ShoppingBag",
        label: "All Products",
        route: "/admin/products",
      },
    ],
  },
  {
    icon: "TicketPercent",
    label: "Vouchers",
    route: "/admin/vouchers",
  },
  {
    icon: "Wallet",
    label: "Payment Methods",
    route: "/admin/payment-methods",
  },
  {
    icon: "Banknote",
    label: "Transactions",
    route: "/admin/transactions",
  },
  {
    icon: "Shield",
    label: "Admins",
    route: "/admin/admins",
    children: [
      {
        icon: "Wrench",
        label: "Roles",
        route: "/admin/roles",
      },
      {
        icon: "KeyRound",
        label: "Permissions",
        route: "/admin/permissions",
      },
      {
        icon: "Users",
        label: "All Admins",
        route: "/admin/admins",
      },
    ],
  },
  {
    icon: "Users",
    label: "Users",
    route: "/admin/users",
  },
];

export const shopPages = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Products",
    path: "/products",
  },
  {
    name: "Series",
    path: "/series",
  },
  {
    name: "Community",
    path: "/community",
  },
];

export const avatars = [
  { path: "/assets/avatars/archer.png", label: "archer" },
  { path: "/assets/avatars/artist.png", label: "artist" },
  { path: "/assets/avatars/fairy.png", label: "fairy" },
  { path: "/assets/avatars/invisible-man.png", label: "invisible-man" },
  { path: "/assets/avatars/ninja.png", label: "ninja" },
  { path: "/assets/avatars/princess.png", label: "princess" },
  { path: "/assets/avatars/robot.png", label: "robot" },
  { path: "/assets/avatars/superwoman.png", label: "superwoman" },
  { path: "/assets/avatars/tree.png", label: "tree" },
  { path: "/assets/avatars/viking.png", label: "viking" },
];

export const series = [
  { path: "/assets/series/gundam.svg", label: "gundam" },
  { path: "/assets/series/zoids.svg", label: "zoids" },
  { path: "/assets/series/digimon.svg", label: "digimon" },
  { path: "/assets/series/pokemon.svg", label: "pokemon" },
  { path: "/assets/series/one-piece.svg", label: "one-piece" },
  { path: "/assets/series/naruto.svg", label: "naruto" },
  { path: "/assets/series/transformers.svg", label: "transformers" },
];
