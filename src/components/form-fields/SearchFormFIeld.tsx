import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

type SearchFormFieldProps = {
  value?: string;
  name: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  onSearchClick?: (value: string) => void;
};

export function SearchFormField({
  value,
  name,
  placeholder,
  className,
  disabled = false,
  onSearchClick,
}: SearchFormFieldProps) {
  const [search, setSearchValue] = useState<string>(value || "");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    if (onSearchClick && !disabled) {
      onSearchClick(search);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current) {
      handleSearch();
      inputRef.current.focus();
    }
  };

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
        placeholder={placeholder}
        className="py-[6px] pr-3 pl-0 border-none h-[34px] rounded-none"
        value={search}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />
    </div>
  );
}
