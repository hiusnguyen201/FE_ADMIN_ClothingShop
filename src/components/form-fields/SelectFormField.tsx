import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export type OptionItem<T> = {
  value: T;
  title: string;
};

export type SelectFormFieldProps<T> = {
  name: string;
  className?: string;
  placeholder?: string;
  switchable?: boolean;
  disabled?: boolean;
  options: OptionItem<T>[];
  value?: T | null;
  onValueChange?: (value: T | null) => void;
};

export function SelectFormField<T>({
  name,
  className,
  placeholder,
  options,
  switchable = true,
  disabled = false,
  value,
  onValueChange,
}: SelectFormFieldProps<T>) {
  const displayValue = () => {
    if (!value) return placeholder || `Select a ${name}`;
    return options.find((item) => item.value === value)?.title;
  };

  const handleChange = (value: T | null) => {
    if (onValueChange) onValueChange(value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        disabled={disabled}
        className={cn("text-start flex items-center justify-between w-full border py-[9px] px-4 rounded", className)}
      >
        <span className={cn("capitalize font-normal text-sm pr-1")}>{displayValue()}</span>
        <ChevronDown width={20} height={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[var(--radix-popper-anchor-width)]">
        {options.map((item) => (
          <DropdownMenuCheckboxItem
            key={item.value as string}
            className="capitalize cursor-pointer font-normal"
            checked={value === item.value}
            disabled={!switchable && value === item.value}
            onCheckedChange={() => handleChange(item.value === value ? null : item.value)}
          >
            {item.title}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
