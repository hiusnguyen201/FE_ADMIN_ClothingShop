import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type ImageProps = {
  aspect?: "3/4" | "16/9" | "1/1";
  width?: number;
  src: string;
  alt: string;
};

export function Image({ aspect = "1/1", src, alt, width = 16 }: ImageProps) {
  return (
    <Avatar className={cn(`w-${width} h-auto rounded-sm border`)}>
      <AvatarImage className={cn(`object-cover w-full h-full aspect-[${aspect}]`)} src={src} alt={alt} />
      <AvatarFallback className="rounded-full capitalize">{alt.charAt(0)}</AvatarFallback>
    </Avatar>
  );
}
