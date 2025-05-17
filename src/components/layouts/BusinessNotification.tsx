import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getListNewNotificationInUser, markAllAsReadNotificationInUser } from "@/redux/account/account.thunk";
import { Link, useLocation } from "react-router-dom";
import { useSocket } from "@/hooks/use-socket";
import { useIsMobile } from "@/hooks/use-mobile";
import { CHANNELS } from "@/constants/channel";
import { NotificationCard } from "@/components/NotificationCard";
import { cn } from "@/lib/utils";
import { AccountState } from "@/redux/account/account.type";
import {} from "@/redux/account/account.slice";

export function BusinessNotification() {
  const dispatch = useAppDispatch();
  const socket = useSocket();
  const isMobile = useIsMobile();
  const location = useLocation();
  const { newUserNotifications, totalCount } = useAppSelector<AccountState>((selector) => selector.account);
  const [isOpen, setIsOpen] = useState(false);

  const inNotificationPage = location.pathname === "/notifications";

  const handleGetNotifications = async () => {
    await dispatch(getListNewNotificationInUser({ page: 1, limit: 5 })).unwrap();
  };

  const markAllAsRead = async () => {
    if (totalCount.totalUnreadNotifications === 0) return;
    await dispatch(markAllAsReadNotificationInUser()).unwrap();
  };

  useEffect(() => {
    socket.on(CHANNELS.NOTIFICATION_CHANEL, handleGetNotifications);

    return () => {
      socket.off(CHANNELS.NOTIFICATION_CHANEL, handleGetNotifications);
    };
  }, []);

  useEffect(() => {
    if (inNotificationPage) return;
    handleGetNotifications();
  }, []);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant={inNotificationPage ? "outline" : "ghost"}
          size="icon"
          className={cn("relative text-white hover:text-black w-8 h-8", inNotificationPage && "text-black")}
        >
          <Bell className="h-5 w-5" />
          {totalCount.totalUnreadNotifications > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {totalCount.totalUnreadNotifications}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      {!inNotificationPage && (
        <DropdownMenuContent
          align="end"
          alignOffset={isMobile ? -44 : -50}
          sideOffset={isMobile ? 4 : 8}
          className="overflow-y-hidden lg:w-[360px]"
        >
          <div className="flex items-center justify-between p-3">
            <h3 className="text-lg font-semibold">Notifications</h3>
            {totalCount.totalUnreadNotifications > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                Mark all as read
              </Button>
            )}
          </div>
          <DropdownMenuSeparator />
          <div className="max-h-[70vh] overflow-y-auto flex flex-col gap-1">
            {newUserNotifications.length > 0 ? (
              newUserNotifications.map((userNotification) => (
                <DropdownMenuItem key={userNotification.id}>
                  <NotificationCard userNotification={userNotification} />
                </DropdownMenuItem>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">No notifications</div>
            )}
          </div>
          <DropdownMenuSeparator />
          <Link to={"/notifications"}>
            <DropdownMenuItem className="justify-center p-3 text-center text-blue-600 hover:text-blue-800">
              View all notifications
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
