import { Button } from "@/components/ui/button";

export function SizeBadge({ title }) {
  return (
    <Button variant="secondary" className="w-[40px] h-[38px]">
      {title}
    </Button>
  );
}
