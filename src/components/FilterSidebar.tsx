"use client";

import { FilterIcon, FilterXIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ReactNode, useEffect } from "react";
import { cn } from "@/lib/utils";

export type FilterSidebarProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onClickClear: () => void;
  title?: string;
  children: ReactNode;
  countFilters?: number;
};

export function FilterSidebar({
  isOpen,
  onOpenChange,
  onClickClear,
  countFilters = 0,
  title = "Filter",
  children,
}: FilterSidebarProps) {
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscKey);
    }

    return () => window.removeEventListener("keydown", handleEscKey);
  }, [isOpen, onOpenChange]);

  return (
    <>
      <Button className="sm:max-w-[120px] min-w-[100px] w-full relative" onClick={() => onOpenChange(true)}>
        <FilterIcon /> Filter
        {countFilters > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {countFilters}
          </span>
        )}
      </Button>

      {/* Overlay when filter is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => {
            onOpenChange(false);
          }}
        />
      )}

      {/* Filter sidebar with animation */}
      <div
        className={cn(
          "fixed top-0 right-0 bottom-0 w-full sm:w-[400px] bg-white shadow-xl z-50 transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <Card className="w-full h-full border-0 rounded-none p-6 overflow-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">{title}</h2>
            <button className="text-gray-500" onClick={() => onOpenChange(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>

          <Button
            className="mb-6 sm:max-w-[120px] min-w-[100px] w-full relative"
            onClick={() => {
              onClickClear();
              onOpenChange(false);
            }}
            variant="outline"
          >
            <FilterXIcon /> Clear filter
          </Button>
          {children}
        </Card>
      </div>
    </>
  );
}
