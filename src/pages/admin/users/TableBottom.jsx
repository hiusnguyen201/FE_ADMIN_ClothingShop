
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
}) => {

  const tableOffset = (currentPage - 1) * pageSize + 1;
  const tableLimit = Math.min(currentPage * pageSize, totalCount);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "16px",
        gap: "16px",
      }}
    >
      {/* Displaying the range of entries */}
      <div style={{ flex: 1, textAlign: "left" }}>
        <p style={{ margin: 0 }}>
          Showing {tableOffset} to {tableLimit} of {totalCount} entries
        </p>
      </div>

      {/* Rows per page selector */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <p style={{ margin: 0 }}>Rows per page</p>
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

      {/* Pagination buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "16px",
        }}
      >
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevious}
          disabled={currentPage <= 1}
        >
          <ChevronLeft/>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleNext}
          disabled={currentPage >= totalPages}
        >
          <ChevronRight/>
        </Button>
      </div>
    </div>
  );
};

export default TableBottom;
