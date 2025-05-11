import type React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { User } from "@/types/user";

type Status = "active" | "inactive" | "locked" | "banned";

interface StatusBadgeProps {
  user: User;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const MINUTES_ACTIVE = 60 * 60 * 1000; // 1 hours

const getStatus = (user: User): Status => {
  if (user.bannedAt) {
    return "banned";
  }

  if (user.lockedAt) {
    return "locked";
  }

  if (user.verifiedAt) {
    return "active";
  }

  return "inactive";
};

export function BadgeUserStatus({ user, size = "md", className }: StatusBadgeProps) {
  const sizeClasses = {
    sm: "h-5 text-[10px] px-1.5",
    md: "h-6 text-xs px-2",
    lg: "h-7 text-sm px-2.5",
  };

  const statusVariant: Record<Status, React.ComponentProps<typeof Badge>["variant"]> = {
    active: "success",
    inactive: "secondary",
    locked: "warning",
    banned: "destructive",
  };

  return (
    <Badge variant={statusVariant[getStatus(user)]} className={cn(sizeClasses[size], "capitalize", className)}>
      {getStatus(user)}
    </Badge>
  );
}
