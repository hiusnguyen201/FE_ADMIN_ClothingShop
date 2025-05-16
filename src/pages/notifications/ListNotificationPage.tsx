import { ContentWrapper } from "@/components/ContentWrapper";
import { Heading } from "@/components/Heading";
import { NotificationCard } from "@/components/NotificationCard";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { getListNotificationInUser } from "@/redux/account/account.thunk";
import { AccountState } from "@/redux/account/account.type";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";

export function ListNotificationPage() {
  const dispatch = useAppDispatch();
  const { totalCount } = useAppSelector<AccountState>((selector) => selector.account);
  const [page, setPage] = useState<number>(1);
  const [items, setItems] = useState<any[]>([]);

  const handleGetNotifications = async () => {
    try {
      const response = await dispatch(getListNotificationInUser({ page: page, limit: 5 })).unwrap();
      setItems((prev) => [...prev, ...response.data.notifications]);
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  useEffect(() => {
    handleGetNotifications();
  }, [page]);

  return (
    <ContentWrapper className="lg:max-w-4xl">
      <Heading title="Notifications" />

      <div className="flex items-center flex-col gap-3">
        {items.length > 0 ? (
          items.map((userNotification) => (
            <NotificationCard key={userNotification.id} userNotification={userNotification} />
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">No notifications</div>
        )}
      </div>

      {totalCount.totalNotifications !== items.length && (
        <div className="flex items-center justify-center">
          <Button onClick={() => setPage(page + 1)}>Load More</Button>
        </div>
      )}
    </ContentWrapper>
  );
}
