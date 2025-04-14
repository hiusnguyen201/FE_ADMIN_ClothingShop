"use client";

import { useState } from "react";
import { Option } from "@/types/option";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface OptionGroupProps {
  option: Option;
  selectedValues: string[];
  onSelectionChange: (selectedValues: string[]) => void;
  className?: string;
}

export function OptionGroup({ option, selectedValues, onSelectionChange, className }: OptionGroupProps) {
  const [open, setOpen] = useState(false);

  const handleToggleValue = (value: string) => {
    if (selectedValues.includes(value)) {
      onSelectionChange(selectedValues.filter((v) => v !== value));
    } else {
      onSelectionChange([...selectedValues, value]);
    }
  };

  return (
    <div className={cn("space-y-2 w-full", className)}>
      <Label className="text-base font-medium capitalize">{option.name}</Label>

      <div className="w-full relative">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
              {selectedValues.length > 0 ? `${selectedValues.length} selected` : `Select ${option.name} values`}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]">
            <Command className="max-h-[312px]">
              <CommandInput placeholder={`Search ${option.name}...`} />
              <CommandList>
                <CommandEmpty>No {option.name} values found.</CommandEmpty>
                <CommandGroup>
                  {option.optionValues.map((optionValue) => {
                    const isSelected = selectedValues.includes(optionValue.valueName);
                    return (
                      <CommandItem
                        key={optionValue.id}
                        value={optionValue.valueName}
                        className="cursor-pointer"
                        onSelect={() => handleToggleValue(optionValue.valueName)}
                      >
                        <span>{optionValue.valueName}</span>
                        {isSelected && <Check className="ml-auto h-4 w-4" />}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        {selectedValues.map((value) => (
          <Badge key={value} variant="secondary" className="text-xs select-none">
            {value}
            <Button variant="ghost" size="icon" className="h-4 w-4 ml-1 p-0" onClick={() => handleToggleValue(value)}>
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>
    </div>
  );
}
