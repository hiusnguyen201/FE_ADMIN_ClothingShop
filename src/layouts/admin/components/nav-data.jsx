import {
  ClipboardList,
  Gauge,
  Package,
  Settings,
  ShoppingCart,
  Ticket,
  Users2,
  UserCog,
  MessageCircleIcon,
  MessageSquare,
  MessagesSquare,
  Boxes,
} from 'lucide-react';

const navItems = [
  {
    title: 'Dashboard',
    url: '/admin/dashboard',
    icon: Gauge,
  },
  {
    title: 'Categories',
    icon: Boxes,
    url: '/admin/categories',
  },
  {
    title: 'Orders',
    icon: ShoppingCart,
    url: '/admin/orders',
  },
  {
    title: 'Products',
    icon: Package,
    url: '/admin/products',
  },
  {
    title: 'Promotions',
    icon: Ticket,
    url: '/admin/vouchers',
  },
  {
    title: 'Customers',
    icon: Users2,
    url: '/admin/customers',
  },
  {
    title: 'Reviews',
    icon: MessagesSquare,
    url: '/admin/reviews',
  },
  {
    title: 'User Management',
    icon: UserCog,
    items: [
      {
        title: 'Users',
        url: '/admin/users',
      },
      {
        title: 'Roles',
        url: '/admin/roles',
      },
      {
        title: 'Permissions',
        url: '/admin/permissions',
      },
    ],
  },
  {
    title: 'Settings',
    url: '/admin/settings',
    icon: Settings,
  },
];

export const navData = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navItems,
  // projects: [
  //   {
  //     name: 'Design Engineering',
  //     url: '#',
  //     icon: Frame,
  //   },
  //   {
  //     name: 'Sales & Marketing',
  //     url: '#',
  //     icon: PieChart,
  //   },
  //   {
  //     name: 'Travel',
  //     url: '#',
  //     icon: Map,
  //   },
  // ],
};
