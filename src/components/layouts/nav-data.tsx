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
    url: "/",
    icon: Gauge,
  },
  {
    title: "Manage categories",
    url: "/categories",
    icon: Blocks,
  },
  {
    title: "Manage products",
    url: "/products",
    icon: Package,
  },
  {
    title: "Manage customers",
    url: "/customers",
    icon: Users2,
  },
  {
    title: "Manage orders",
    url: "/orders",
    icon: ShoppingCart,
  },
];

const navMainGroupSystem = [
  {
    title: "Manage users",
    url: "/users",
    icon: Users2,
  },
  {
    title: "Manage roles",
    url: "/roles",
    icon: UserCog2,
  },
  {
    title: "Manage permissions",
    url: "/permissions",
    icon: KeyRound,
  },
  {
    title: "Settings",
    url: "/settings",
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
    url: "/",
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
