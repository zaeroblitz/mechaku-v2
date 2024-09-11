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
        icon: "ShoppingBag",
        label: "All Products",
        route: "/admin/products",
      },
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
        icon: "Bookmark",
        label: "Product Status",
        route: "/admin/product-status",
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
    label: "Payments",
    route: "/admin/payments",
    children: [
      {
        icon: "CreditCard",
        label: "Payment Methods",
        route: "/admin/payments",
      },
      {
        icon: "Coins",
        label: "Payment Status",
        route: "/admin/payment-status",
      },
    ],
  },
  {
    icon: "Banknote",
    label: "Transactions",
    route: "/admin/transactions",
    children: [
      {
        icon: "CircleDollarSign",
        label: "All Transactions",
        route: "/admin/transactions",
      },
      {
        icon: "HandCoins",
        label: "Transaction Status",
        route: "/admin/transaction-status",
      },
    ],
  },
  {
    icon: "Shield",
    label: "Admins",
    route: "/admin/admins",
  },
  {
    icon: "Users",
    label: "Users",
    route: "/admin/users",
  },
];
