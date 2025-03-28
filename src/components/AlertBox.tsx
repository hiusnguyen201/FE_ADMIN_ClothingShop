import { ReactNode } from "react";

type AlertBoxProps = {
  title: string;
  description: string;
  rightAction?: ReactNode;
  variant?: "success" | "danger" | "info";
};

const variantValues = {
  success: "text-success-foreground bg-success/10",
  danger: "text-destructive-foreground bg-destructive/10",
  info: "border bg-[transparent]",
};

export function AlertBox({ title, description, rightAction, variant = "danger" }: AlertBoxProps) {
  return (
    <div className={`flex items-center p-6 w-full ${variantValues[variant]} rounded min-h-24`}>
      <div className="gap-1 flex flex-col mr-6 flex-1">
        <h6 className="capitalize text-sm font-medium">{title}</h6>
        <p className="text-sm">{description}</p>
      </div>
      {rightAction}
    </div>
  );
}
