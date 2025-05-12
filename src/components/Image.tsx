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

const LETTER_COLORS: { [key: string]: string } = {
  A: "hsl(14, 91%, 86%)",
  B: "hsl(28, 91%, 86%)",
  C: "hsl(42, 91%, 86%)",
  D: "hsl(56, 91%, 86%)",
  E: "hsl(70, 91%, 86%)",
  F: "hsl(84, 91%, 86%)",
  G: "hsl(98, 91%, 86%)",
  H: "hsl(112, 91%, 86%)",
  I: "hsl(126, 91%, 86%)",
  J: "hsl(140, 91%, 86%)",
  K: "hsl(154, 91%, 86%)",
  L: "hsl(168, 91%, 86%)",
  M: "hsl(182, 91%, 86%)",
  N: "hsl(196, 91%, 86%)",
  O: "hsl(210, 91%, 86%)",
  P: "hsl(224, 91%, 86%)",
  Q: "hsl(238, 91%, 86%)",
  R: "hsl(252, 91%, 86%)",
  S: "hsl(266, 91%, 86%)",
  T: "hsl(280, 91%, 86%)",
  U: "hsl(294, 91%, 86%)",
  V: "hsl(308, 91%, 86%)",
  W: "hsl(322, 91%, 86%)",
  X: "hsl(336, 91%, 86%)",
  Y: "hsl(350, 91%, 86%)",
  Z: "hsl(364, 91%, 86%)",
};

const getLetterColor = (letter: string) => {
  const upperLetter = letter.toUpperCase();
  return LETTER_COLORS[upperLetter] || LETTER_COLORS["A"]; // fallback to first color if letter not found
};
function calculateHeight(aspect: "1/1" | "3/4" | "4/3" | "16/9" | "9/16", size: number) {
  const [w, h] = aspect.split("/").map(Number);
  return size * (h / w);
}

export function Image({ aspect = "1/1", src, alt, size = 64, className, type = "normal" }: ImageProps) {
  if (type === "avatar") {
    const firstChar = alt.charAt(0).toUpperCase() || "?";
    const backgroundColor = useMemo(() => getLetterColor(firstChar), [firstChar]);
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
