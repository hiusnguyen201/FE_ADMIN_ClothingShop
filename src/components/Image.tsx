import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Nullable } from "@/types/common";
import { useMemo } from "react";

type ImageProps = {
  aspect?: "3/4" | "16/9" | "1/1" | "4/3" | "9/16";
  size?: number;
  src: Nullable<string>;
  alt: string;
  className?: string;
  type?: "avatar" | "normal";
};

const getRandomColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 80%)`;
};

function calculateHeight(aspect: "1/1" | "3/4" | "4/3" | "16/9" | "9/16", size: number) {
  const [w, h] = aspect.split("/").map(Number);
  return size * (h / w);
}

export function Image({ aspect = "1/1", src, alt, size = 64, className, type = "normal" }: ImageProps) {
  if (type === "avatar") {
    const backgroundColor = useMemo(() => getRandomColor(), []);
    const firstChar = alt.charAt(0).toUpperCase() || "?";
    return (
      <Avatar className={cn("rounded-full", className)} style={{ height: size, width: size }}>
        {src && <AvatarImage className="rounded-full object-cover" src={src} alt={alt} />}
        <AvatarFallback className="rounded-full capitalize" style={{ backgroundColor }}>
          {firstChar}
        </AvatarFallback>
      </Avatar>
    );
  }

  return (
    <Avatar
      className={cn(`rounded border w-auto h-auto aspect-[${aspect}]`, className)}
      style={{ height: calculateHeight(aspect, size), width: size }}
    >
      {src && <AvatarImage className={cn(`rounded object-cover`)} src={src} alt={alt} />}
      <AvatarFallback className="rounded capitalize">{alt?.charAt(0)}</AvatarFallback>
    </Avatar>
  );
}
