import { PERMISSIONS } from "@/constants/permissions";
import {
  Blocks,
  Gauge,
  KeyRound,
  Package,
  Settings,
  ShoppingCart,
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
    permission: PERMISSIONS.READ_CATEGORIES,
  },
  {
    title: "Manage products",
    url: "/products",
    icon: Package,
    permission: PERMISSIONS.READ_PRODUCTS,
  },
  {
    title: "Manage customers",
    url: "/customers",
    icon: Users2,
    permission: PERMISSIONS.READ_CUSTOMERS,
  },
  {
    title: "Manage orders",
    url: "/orders",
    icon: ShoppingCart,
    permission: PERMISSIONS.READ_ORDERS,
  },
];

const navMainGroupSystem = [
  {
    title: "Manage users",
    url: "/users",
    icon: Users2,
    permission: PERMISSIONS.READ_USERS,
  },
  {
    title: "Manage roles",
    url: "/roles",
    icon: UserCog2,
    permission: PERMISSIONS.READ_ROLES,
  },
  {
    title: "Manage permissions",
    url: "/permissions",
    icon: KeyRound,
    permission: PERMISSIONS.READ_PERMISSIONS,
  },
];

export const navData = {
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
