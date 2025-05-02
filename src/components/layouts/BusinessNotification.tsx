import { useEffect, useState } from "react";
import { Bell, CheckCircle, Loader2, Package, ShoppingBag, Store, Truck, User, XCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  getListNotificationInUser,
  markAllAsReadNotificationInUser,
  markAsReadNotificationInUser,
} from "@/redux/account/account.thunk";
import { AnyNotification, NotificationType, UserNotification } from "@/types/notification";
import { formatCurrencyVND } from "@/utils/string";
import { Link } from "react-router-dom";
import moment from "moment";
import { useSocket } from "@/hooks/use-socket";
import { useIsMobile } from "@/hooks/use-mobile";
import { formatDateString } from "@/utils/date";

export function BusinessNotification() {
  const dispatch = useAppDispatch();
  const socket = useSocket();
  const isMobile = useIsMobile();
  const { userNotifications, totalCount } = useAppSelector((selector) => selector.account);
  const [isOpen, setIsOpen] = useState(false);

  const initialize = async () => {
    await dispatch(getListNotificationInUser({ page: 1, limit: 5 })).unwrap();
  };

  const markAsRead = async (userNotification: UserNotification) => {
    if (userNotification.isRead) return;
    await dispatch(markAsReadNotificationInUser({ id: userNotification.id })).unwrap();
  };

  const markAllAsRead = async () => {
    if (totalCount.totalUnreadNotifications === 0) return;
    await dispatch(markAllAsReadNotificationInUser()).unwrap();
  };

  useEffect(() => {
    const eventsToListen = [
      NotificationType.NEW_CUSTOMER,
      NotificationType.NEW_ORDER,
      NotificationType.LOW_STOCK,
      NotificationType.CONFIRM_ORDER,
      NotificationType.PROCESSING_ORDER,
      NotificationType.READY_FOR_PICKUP,
      NotificationType.SHIPPING_ORDER,
      NotificationType.CANCEL_ORDER,
      NotificationType.COMPLETE_ORDER,
    ];

    const handleNotification = () => {
      initialize();
    };

    eventsToListen.forEach((event) => {
      socket.on(event, handleNotification);
    });

    return () => {
      eventsToListen.forEach((event) => {
        socket.off(event, handleNotification);
      });
    };
  }, []);

  useEffect(() => {
    initialize();
  }, []);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-white hover:text-black w-8 h-8">
          <Bell className="h-5 w-5" />
          {totalCount.totalUnreadNotifications > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {totalCount.totalUnreadNotifications}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
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
        <div className="max-h-[70vh] overflow-y-auto">
          {userNotifications.length > 0 ? (
            userNotifications.map((userNotification) => (
              <Link
                key={userNotification.id}
                onClick={() => markAsRead(userNotification)}
                onAuxClick={() => markAsRead(userNotification)}
                to={getNotificationLink(userNotification.notification)}
              >
                <DropdownMenuItem
                  className={cn(
                    "flex cursor-pointer gap-3 p-3 focus:bg-gray-100",
                    !userNotification.isRead && "bg-gray-50"
                  )}
                >
                  <div className="flex-shrink-0">{getNotificationIcon(userNotification.notification.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "inline-block rounded-full px-2 py-0.5 text-xs font-medium",
                          getNotificationColor(userNotification.notification.type)
                        )}
                      >
                        {getNotificationTitle(userNotification.notification)}
                      </span>
                      {!userNotification.isRead && <span className="h-2 w-2 rounded-full bg-blue-600"></span>}
                    </div>
                    <div className="mt-1 text-sm"> {getNotificationDescription(userNotification.notification)}</div>
                    <p className="mt-1 text-xs text-gray-500">{moment(userNotification.deliveredAt).fromNow()}</p>
                  </div>
                </DropdownMenuItem>
              </Link>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">No notifications</div>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center p-3 text-center text-blue-600 hover:text-blue-800">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function getNotificationTitle(notification: AnyNotification) {
  switch (notification.type) {
    case NotificationType.NEW_CUSTOMER:
      return `New Customer`;
    case NotificationType.NEW_ORDER:
      return `New Order #${notification.metadata.code}`;
    case NotificationType.LOW_STOCK:
      return `Low Stock Alert`;
    case NotificationType.CONFIRM_ORDER:
      return `Order Confirmed`;
    case NotificationType.PROCESSING_ORDER:
      return `Order Processing`;
    case NotificationType.READY_FOR_PICKUP:
      return `Ready for Pickup`;
    case NotificationType.SHIPPING_ORDER:
      return `Order Shipped`;
    case NotificationType.CANCEL_ORDER:
      return `Order Cancelled`;
    case NotificationType.COMPLETE_ORDER:
      return `Order Completed`;
    default:
      return "Title";
  }
}

function getNotificationDescription(notification: AnyNotification) {
  switch (notification.type) {
    case NotificationType.NEW_CUSTOMER:
      return (
        <p>
          <span className="font-medium">{notification.metadata.name}</span> has registered as a new customer
        </p>
      );

    case NotificationType.NEW_ORDER:
      return (
        <p>
          A new order of <span className="font-medium">{formatCurrencyVND(notification.metadata.total)}</span> has been
          placed
        </p>
      );

    case NotificationType.LOW_STOCK: {
      const metadata = notification.metadata;
      return (
        <div className="space-y-1">
          <p>
            <span className="font-medium">{metadata.productName}</span>{" "}
            <span className="font-semibold text-red-600 text-xs">({metadata.quantity} items)</span>
          </p>
          <div className="flex flex-wrap gap-1 text">
            {metadata.variantValues.map((variant, index) => (
              <span
                key={`${variant.optionName}-${index}`}
                className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800"
              >
                {variant.optionName}: {variant.optionValue}
              </span>
            ))}
          </div>
        </div>
      );
    }
    case NotificationType.CONFIRM_ORDER: {
      const metadata = notification.metadata;
      return (
        <div className="space-y-1">
          <p>
            Order <span className="font-medium">#{metadata.code}</span> has been confirmed
          </p>
          <p className="text-xs text-gray-600">
            Customer: {metadata.customerName} • Total: {formatCurrencyVND(metadata.total)}
          </p>
        </div>
      );
    }

    case NotificationType.PROCESSING_ORDER: {
      const metadata = notification.metadata;
      return (
        <div className="space-y-1">
          <p>
            Order <span className="font-medium">#{metadata.code}</span> is now being processed
          </p>
          <p className="text-xs text-gray-600">
            Customer: {metadata.customerName} • Total: {formatCurrencyVND(metadata.total)}
          </p>
        </div>
      );
    }

    case NotificationType.READY_FOR_PICKUP: {
      const metadata = notification.metadata;
      return (
        <div className="space-y-1">
          <p>
            Order <span className="font-medium">#{metadata.code}</span> is ready for pickup
          </p>
          <p className="text-xs text-gray-600">
            Customer: {metadata.customerName} • Total: {formatCurrencyVND(metadata.total)}
          </p>
        </div>
      );
    }

    case NotificationType.SHIPPING_ORDER: {
      const metadata = notification.metadata;
      return (
        <div className="space-y-1">
          <p>
            Order <span className="font-medium">#{metadata.code}</span> has been shipped
          </p>
          <p className="text-xs text-gray-600">
            Customer: {metadata.customerName} • Total: {formatCurrencyVND(metadata.total)}
          </p>
          {metadata.trackingNumber && (
            <p className="text-xs">
              Tracking: <span className="font-medium">{metadata.trackingNumber}</span>
            </p>
          )}
          {metadata.estimatedDeliveryAt && (
            <p className="text-xs">
              Estimated delivery:{" "}
              <span className="font-medium">{formatDateString(metadata.estimatedDeliveryAt, "date")}</span>
            </p>
          )}
        </div>
      );
    }

    case NotificationType.CANCEL_ORDER: {
      const metadata = notification.metadata;
      return (
        <div className="space-y-1">
          <p>
            Order <span className="font-medium">#{metadata.code}</span> has been cancelled
          </p>
          <p className="text-xs text-gray-600">
            Customer: {metadata.customerName} • Total: {formatCurrencyVND(metadata.total)}
          </p>
          {metadata.reason && <p className="text-xs text-red-600">Reason: {metadata.reason}</p>}
        </div>
      );
    }

    case NotificationType.COMPLETE_ORDER: {
      const metadata = notification.metadata;
      return (
        <div className="space-y-1">
          <p>
            Order <span className="font-medium">#{metadata.code}</span> has been completed
          </p>
          <p className="text-xs text-gray-600">
            Customer: {metadata.customerName} • Total: {formatCurrencyVND(metadata.total)}
          </p>
        </div>
      );
    }
    default:
      return <p>Description</p>;
  }
}

function getNotificationIcon(type: NotificationType) {
  switch (type) {
    case NotificationType.NEW_CUSTOMER:
      return <User className="h-5 w-5 text-green-500" />;
    case NotificationType.NEW_ORDER:
      return <ShoppingBag className="h-5 w-5 text-blue-500" />;
    case NotificationType.LOW_STOCK:
      return <Package className="h-5 w-5 text-orange-500" />;
    case NotificationType.CONFIRM_ORDER:
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case NotificationType.PROCESSING_ORDER:
      return <Loader2 className="h-5 w-5 text-blue-500" />;
    case NotificationType.READY_FOR_PICKUP:
      return <Store className="h-5 w-5 text-purple-500" />;
    case NotificationType.SHIPPING_ORDER:
      return <Truck className="h-5 w-5 text-blue-500" />;
    case NotificationType.CANCEL_ORDER:
      return <XCircle className="h-5 w-5 text-red-500" />;
    case NotificationType.COMPLETE_ORDER:
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    default:
      return <Bell className="h-5 w-5 text-gray-500" />;
  }
}

function getNotificationColor(type: NotificationType) {
  switch (type) {
    case NotificationType.NEW_CUSTOMER:
      return "bg-green-100 text-green-800";
    case NotificationType.NEW_ORDER:
      return "bg-blue-100 text-blue-800";
    case NotificationType.LOW_STOCK:
      return "bg-orange-100 text-orange-800";
    case NotificationType.CONFIRM_ORDER:
      return "bg-green-100 text-green-800";
    case NotificationType.PROCESSING_ORDER:
      return "bg-blue-100 text-blue-800";
    case NotificationType.READY_FOR_PICKUP:
      return "bg-purple-100 text-purple-800";
    case NotificationType.SHIPPING_ORDER:
      return "bg-blue-100 text-blue-800";
    case NotificationType.CANCEL_ORDER:
      return "bg-red-100 text-red-800";
    case NotificationType.COMPLETE_ORDER:
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function getNotificationLink(notification: AnyNotification) {
  switch (notification.type) {
    case NotificationType.NEW_CUSTOMER:
      return `/customers/${notification.metadata.customerId}/settings`;
    case NotificationType.NEW_ORDER:
      return `/orders/${notification.metadata.orderId}`;
    case NotificationType.LOW_STOCK:
      return `/products/${notification.metadata.productId}/settings`;
    case NotificationType.CONFIRM_ORDER:
      return `/orders/${notification.metadata.orderId}`;
    case NotificationType.PROCESSING_ORDER:
      return `/orders/${notification.metadata.orderId}`;
    case NotificationType.READY_FOR_PICKUP:
      return `/orders/${notification.metadata.orderId}`;
    case NotificationType.SHIPPING_ORDER:
      return `/orders/${notification.metadata.orderId}`;
    case NotificationType.CANCEL_ORDER:
      return `/orders/${notification.metadata.orderId}`;
    case NotificationType.COMPLETE_ORDER:
      return `/orders/${notification.metadata.orderId}`;
    default:
      return "#";
  }
}
