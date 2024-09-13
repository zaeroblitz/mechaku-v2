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
