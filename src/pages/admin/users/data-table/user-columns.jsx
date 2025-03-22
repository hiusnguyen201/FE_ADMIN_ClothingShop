import { Link } from 'react-router-dom';
import { Mail, MoreHorizontal, Smartphone, Trash } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LetterAvatar } from '@/components/letter-avatar';
import { TooltipButton } from '@/components/tooltip-button';
import { CircleColor } from '@/components/circle-color';
import { CheckedIcon } from '@/components/icons';
import { formatDate } from '@/utils/date-string';
import { GENDER } from '@/constant';

export const userColumns = [
  {
    id: 'name',
    enableSorting: true,
    header: ({ column }) => <div>Name</div>,
    cell: ({ row }) => {
      const { original } = row;

      return (
        <div className="flex gap-4">
          <LetterAvatar src={original.avatar} alt={original.name} />
          <div>
            <p className="text-[var(--bgcl-primary)] flex items-center gap-1">
              <Link to={original.id}>{original.name}</Link>
              {original.verifiedAt && (
                <TooltipButton content={formatDate(original.verifiedAt)} className="text-green-500" size={4}>
                  <CheckedIcon />
                </TooltipButton>
              )}
            </p>
            <p className="text-[var(--color-secondary)] font-normal lowercase">
              <span>{original.email}</span>
            </p>
          </div>
        </div>
      );
    },
  },
  {
    id: 'userRole',
    header: ({ column }) => <div>User Role</div>,
    cell: ({ row }) => {
      const { original } = row;

      return <div>{original.role?.name}</div>;
    },
  },
  {
    id: 'status',
    header: () => <div>Status</div>,
    cell: ({ row }) => {
      const { original } = row;

      const statusColor = {
        active: 'success',
        inactive: 'error',
      };

      return (
        <div className="flex items-center gap-2">
          <CircleColor variant={statusColor[original.status]} />
          <span className="capitalize">{original.status}</span>
        </div>
      );
    },
  },
  {
    id: 'lastLogin',
    enableSorting: true,
    header: () => <div>Last Login</div>,
    cell: ({ row }) => {
      const { original } = row;

      return <div className="capitalize">{original.lastLoginAt ? formatDate(original.lastLoginAt) : 'never'}</div>;
    },
  },
  {
    id: 'contact',
    header: () => <div>Contact</div>,
    cell: ({ row }) => {
      const { original } = row;

      return (
        <div className="flex items-center gap-2 select-none">
          <TooltipButton content={original.phone}>
            <a href={`tel:${original.phone}`}>
              <Smartphone />
            </a>
          </TooltipButton>
          <TooltipButton content={original.email}>
            <a href={`mailto:${original.email}`}>
              <Mail />
            </a>
          </TooltipButton>
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { original } = row;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <TooltipButton shape="square" variant="outline" content="More Actions">
              <MoreHorizontal />
            </TooltipButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="font-normal text-[var(--color-secondary)] text-sm" align="end">
            <DropdownMenuItem>
              <Link to={'/admin/users/' + original.id}>View Details</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Assign Roles</DropdownMenuItem>
            <DropdownMenuItem>Assign Permissions</DropdownMenuItem>
            <DropdownMenuItem>Send Verification Email</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Change Email</DropdownMenuItem>
            <DropdownMenuItem>Reset Password</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500 hover-">
              <Trash /> Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const fakeData = [
  {
    id: 'm5gr84i9',
    avatar: null,
    name: 'gen99',
    email: 'ken99@example.com',
    status: 'active',
    phone: '0912345678',
    verifiedAt: '2025-03-22T02:57:13.546Z',
    lastLoginAt: '2025-03-10T02:57:13.546Z',
    role: {
      id: 'casSasc24',
      name: 'Admin',
    },
  },
  {
    id: '3u1reuv4',
    avatar: null,
    name: 'abe45',
    email: 'Abe45@example.com',
    status: 'active',
    phone: '0912345678',
    verifiedAt: null,
    role: {
      id: 'casSasc24',
      name: 'Delivery',
    },
  },
  {
    id: 'derv1ws0',
    avatar: null,
    name: 'fonserrat44',
    email: 'Monserrat44@example.com',
    status: 'inactive',
    phone: '0912345678',
    verifiedAt: '2025-03-22T02:57:13.546Z',
    lastLoginAt: '2025-03-19T02:57:13.546Z',
  },
  {
    id: '5kma53ae',
    avatar: null,
    name: 'dilas22',
    email: 'Silas22@example.com',
    status: 'active',
    phone: '0912345678',
    verifiedAt: null,
  },
  {
    id: 'bhqecj4p',
    avatar: null,
    name: 'carmella',
    email: 'carmella@example.com',
    status: 'inactive',
    phone: '0912345678',
    verifiedAt: '2025-03-22T02:57:13.546Z',
    lastLoginAt: '2025-03-20T02:57:13.546Z',
    role: {
      id: 'casSasc24',
      name: 'Salesperson',
    },
  },
];
