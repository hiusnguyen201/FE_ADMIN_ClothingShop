import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LIMIT_PAGE } from "./constant";
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

const TableBottom = ({
  currentPage,
  totalPages,
  pageSize,
  totalCount,
  onPageChange,
  onPageSizeChange,
  isFirst,
  isLast,
  isNext,
  isPrevious,
}) => {
  const tableOffset = (currentPage - 1) * pageSize + 1;
  const tableLimit = Math.min(currentPage * pageSize, totalCount);

  return (
    <div className="flex justify-between items-center mt-4 gap-4">
     
      <div className="flex-1 text-left">
        <p className="text-sm">
          Showing {tableOffset} to {tableLimit} of {totalCount} entries
        </p>
      </div>

     
      <div
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }} 
      >
        <p className="text-sm">Rows per page</p>
        <Select
          value={String(pageSize)}
          onValueChange={(value) => onPageSizeChange(Number(value))}
        >
          <SelectTrigger className="w-[70px]">
            <SelectValue placeholder="Select page size" />
          </SelectTrigger>
          <SelectContent>
            {LIMIT_PAGE.map((value) => (
              <SelectItem key={value} value={String(value)}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

     
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(1)}
          disabled={isFirst}
        >
          <ChevronsLeft />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!isPrevious}
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!isNext}
        >
          <ChevronRight />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(totalPages)}
          disabled={isLast}
        >
          <ChevronsRight />
        </Button>
      </div>
    </div>
  );
};

export default TableBottom;
