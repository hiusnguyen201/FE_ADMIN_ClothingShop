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

const TableBottom = ({
  getCanPreviousPage,
  getCanNextPage,
  previousPage,
  nextPage,
  pageSize,
  onPageSizeChange,

  tableOffSet,
  tableLimit,
  tableTotalCount, 
}) => {
  

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
      <div style={{ flex: 1, textAlign: "left" }}>
        <p style={{ margin: 0 }}>
          Showing {tableOffSet} to {tableLimit} of {tableTotalCount} entries
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
        <p style={{ margin: 0 }}>Rows per page</p>
        <Select value={pageSize} onValueChange={onPageSizeChange}>
          <SelectTrigger className="w-[70px]">
            <SelectValue placeholder="Select page size" />
          </SelectTrigger>
          <SelectContent>
            {LIMIT_PAGE.map((value) => (
              <SelectItem key={value} value={value}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

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
          onClick={previousPage}
          disabled={!getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={nextPage}
          disabled={!getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default TableBottom;
