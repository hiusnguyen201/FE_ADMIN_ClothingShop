import {
  Blocks,
  ClipboardList,
  ClipboardPlus,
  Gauge,
  KeyRound,
  Package,
  Settings,
  ShoppingCart,
  Star,
  Ticket,
  UserCog2,
  Users2,
  GalleryVerticalEnd,
} from "lucide-react";

const navMainGroupApp = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: Gauge,
  },
  {
    title: "Manage categories",
    url: "/admin/categories",
    icon: Blocks,
    items: [
      {
        icon: ClipboardList,
        title: "List categories",
        url: "/admin/categories",
      },
      {
        icon: ClipboardPlus,
        title: "Create category",
        url: "/admin/categories/create",
      },
    ],
  },
  {
    title: "Manage products",
    url: "/admin/products",
    icon: Package,
    items: [
      {
        icon: ClipboardList,
        title: "List products",
        url: "/admin/products",
      },
      {
        icon: ClipboardPlus,
        title: "Create product",
        url: "/admin/products/create",
      },
    ],
  },
  {
    title: "Manage vouchers",
    url: "/admin/vouchers",
    icon: Ticket,
    items: [
      {
        icon: ClipboardList,
        title: "List vouchers",
        url: "/admin/vouchers",
      },
      {
        icon: ClipboardPlus,
        title: "Create voucher",
        url: "/admin/vouchers/create",
      },
    ],
  },
  {
    title: "Manage customers",
    url: "/admin/customers",
    icon: Users2,
    items: [
      {
        icon: ClipboardList,
        title: "List customers",
        url: "/admin/customers",
      },
      {
        icon: ClipboardPlus,
        title: "Create customer",
        url: "/admin/customers/create",
      },
    ],
  },
  {
    title: "Manage orders",
    url: "/admin/orders",
    icon: ShoppingCart,
    items: [
      {
        icon: ClipboardList,
        title: "List orders",
        url: "/admin/orders",
      },
      {
        icon: ClipboardPlus,
        title: "Create order",
        url: "/admin/orders/create",
      },
    ],
  },
  {
    title: "Manage reviews",
    url: "#",
    icon: Star,
    items: [
      {
        icon: ClipboardList,
        title: "List reviews",
        url: "/admin/reviews",
      },
      {
        icon: ClipboardPlus,
        title: "Create review",
        url: "/admin/reviews/create",
      },
    ],
  },
];

const navMainGroupSystem = [
  {
    title: "Manage users",
    url: "/admin/users",
    icon: Users2,
    items: [
      {
        icon: ClipboardList,
        title: "List users",
        url: "/admin/users",
      },
      {
        icon: ClipboardPlus,
        title: "Create user",
        url: "/admin/users/create",
      },
    ],
  },
  {
    title: "Manage roles",
    url: "/admin/roles",
    icon: UserCog2,
    items: [
      {
        icon: ClipboardList,
        title: "List roles",
        url: "/admin/roles",
      },
      {
        icon: ClipboardPlus,
        title: "Create role",
        url: "/admin/roles/create",
      },
    ],
  },
  {
    title: "Manage permissions",
    url: "/admin/permissions",
    icon: KeyRound,
    items: [
      {
        icon: ClipboardList,
        title: "List permissions",
        url: "/admin/permissions",
      },
      {
        icon: ClipboardPlus,
        title: "Create permission",
        url: "/admin/permissions/create",
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
  team: {
    name: "Acme Inc",
    logo: GalleryVerticalEnd,
    url: "/admin/dashboard",
    plan: "Enterprise",
  },
  navMainGroupApp,
  navMainGroupSystem,
  // projects: [
  //   {
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: Frame,
  //   },
  //   {
  //     name: "Sales & Marketing",
  //     url: "#",
  //     icon: PieChart,
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: Map,
  //   },
  // ],
};
