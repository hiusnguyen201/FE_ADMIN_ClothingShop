import {
  ClipboardList,
  Gauge,
  Package,
  Settings,
  ShoppingCart,
  Ticket,
  Users2,
  Frame,
  PieChart,
  UserCog,
} from "lucide-react";

const navItems = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: Gauge,
  },
  {
    title: "Product Management",
    icon: Package,
    items: [
      {
        icon: ClipboardList,
        title: "Categories",
        url: "/admin/categories",
      },
      {
        icon: ClipboardList,
        title: "Products",
        url: "/admin/products",
      },
      {
        icon: ClipboardList,
        title: "Reviews",
        url: "/admin/reviews",
      },
    ],
  },
  {
    title: "Order Management",
    icon: ShoppingCart,
    items: [
      {
        icon: ClipboardList,
        title: "Orders",
        url: "/admin/orders",
      },
      {
        icon: ClipboardList,
        title: "Products",
        url: "/admin/products",
      },
      {
        icon: ClipboardList,
        title: "Reviews",
        url: "/admin/reviews",
      },
    ],
  },
  {
    title: "Promotions",
    icon: Ticket,
    items: [
      {
        icon: ClipboardList,
        title: "Vouchers",
        url: "/admin/vouchers",
      },
    ],
  },
  {
    title: "Customer Management",
    icon: Users2,
    items: [
      {
        icon: ClipboardList,
        url: "/admin/customers",
        title: "Customers",
      },
    ],
  },
  {
    title: "User Management",
    icon: UserCog,
    items: [
      {
        icon: ClipboardList,
        title: "Users",
        url: "/admin/users",
      },
      {
        icon: ClipboardList,
        title: "Roles",
        url: "/admin/roles",
      },
      {
        icon: ClipboardList,
        title: "Permissions",
        url: "/admin/permissions",
      },
    ],
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
];

export const navData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navItems,
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};
