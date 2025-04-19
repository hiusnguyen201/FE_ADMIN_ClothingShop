import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

type SearchFormFieldProps = {
  value?: string;
  name: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  type?: "click" | "change";
  onSearchChange?: (value: string) => void;
  onValueChange?: (value: string) => void;
};

export function SearchFormField({
  value,
  type = "change",
  name,
  placeholder,
  className,
  disabled = false,
  onSearchChange,
  onValueChange,
}: SearchFormFieldProps) {
  const [search, setSearchValue] = useState<string>(value || "");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocus, setIsFocus] = useState(false);

  const handleSearch = () => {
    if (type === "change") return;
    if (onSearchChange && !disabled) {
      onSearchChange(search);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (type === "change") return;
    if (e.key === "Enter" && inputRef.current) {
      handleSearch();
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (isFocus) {
      inputRef?.current?.focus();
    }
  }, [disabled]);

  return (
    <div
      className={cn(
        "relative flex items-center text-sm gap-2 border rounded pl-[14px] focus-within:ring-2 focus-within:ring-ring focus-within:ring-primary",
        className
      )}
    >
      <Search
        className={cn("h-4 w-4 text-muted-foreground", disabled ? "cursor-normal" : "cursor-pointer")}
        onClick={handleSearch}
      />
      <Input
        id={name}
        ref={inputRef}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        type="search"
        name={name}
        onFocus={() => {
          setIsFocus(true);
        }}
        onBlur={() => {
          setIsFocus(false);
        }}
        placeholder={placeholder}
        className="py-[6px] pr-3 pl-0 border-none h-[34px] rounded-none"
        value={search}
        onChange={(e) => {
          if (type === "change") {
            onValueChange?.(e.target.value);
          }
          setSearchValue(e.target.value);
        }}
      />
    </div>
  );
}
