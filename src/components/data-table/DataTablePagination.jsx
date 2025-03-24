import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SelectObjectField } from "@/components/formik-fields";

export const LIMIT_PER_PAGE = [10, 20, 30, 40, 50];

export function DataTablePagination({ loading, limit, totalCount, page, onLimitChange, onPageChange }) {
  const totalPages = Math.max(Math.ceil(totalCount / limit), 1);
  const isFirst = page !== 1;
  const isLast = page !== totalPages;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 sm:flex-row text-sm font-small">
      <div className="col-span-1 sm:col-span-1 flex items-center justify-start gap-1">
        <p className="whitespace-nowrap">Rows per page</p>
        <SelectObjectField
          disabled={loading}
          className="w-auto"
          name="limit"
          value={limit}
          onValueChange={(val) => {
            onLimitChange(LIMIT_PER_PAGE.includes(val) ? val : LIMIT_PER_PAGE[0]);
          }}
          options={LIMIT_PER_PAGE.map((val) => ({ title: `${val}`, value: val }))}
        />
      </div>

      <div className="col-span-1 sm:col-span-1 flex items-center justify-end sm:justify-center gap-1">
        <span>Page</span>
        <SelectObjectField
          disabled={loading}
          className="w-auto"
          name="page"
          value={page}
          onValueChange={onPageChange}
          options={Array.from({ length: totalPages }, (_, i) => ({
            title: `${i + 1}`,
            value: i + 1,
          }))}
        />
        <span>of</span>
        <span>{totalPages || 1}</span>
      </div>

      <div className="col-span-3 sm:col-span-1 flex items-center justify-center sm:justify-end gap-1">
        {/* First */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            onPageChange(1);
          }}
          disabled={!isFirst || loading}
        >
          <ChevronsLeft />
        </Button>
        {/* Previous */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            onPageChange(page - 1);
          }}
          disabled={!isFirst || loading}
        >
          <ChevronLeft />
        </Button>
        {/* Next */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            onPageChange(page + 1);
          }}
          disabled={!isLast || loading}
        >
          <ChevronRight />
        </Button>
        {/* Last */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            onPageChange(totalPages);
          }}
          disabled={!isLast || loading}
        >
          <ChevronsRight />
        </Button>
      </div>
    </div>
  );
}
