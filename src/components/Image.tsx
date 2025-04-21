import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type ImageProps = {
  aspect?: "3/4" | "16/9" | "1/1" | "4/3" | "9/16";
  width?: number;
  src: string;
  alt: string;
  className?: string;
};

export function Image({ aspect = "1/1", src, alt, width = 64, className }: ImageProps) {
  return (
    <Avatar className={cn(`rounded border`, className)} style={{ width, height: "auto" }}>
      <AvatarImage className={cn(`rounded object-cover w-full h-full aspect-[${aspect}]`)} src={src} alt={alt} />
      <AvatarFallback className="rounded capitalize">{alt?.charAt(0)}</AvatarFallback>
    </Avatar>
  );
}
