import { ReactNode } from "react";

interface TagProps {
  children: ReactNode;
}

export function Tag({ children }: TagProps) {
  return <span className="rounded bg-gray-100 text-xs py-[1px] px-[6px] text-gray-700">{children}</span>;
}
