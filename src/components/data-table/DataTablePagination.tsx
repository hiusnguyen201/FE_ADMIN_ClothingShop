import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SelectFormField } from "@/components/form-fields";

export const LIMIT_PER_PAGE: number[] = [10, 25, 50, 100];

export type DataTablePaginationProps = {
  loading: boolean;
  limit: number;
  totalCount: number;
  page: number;
  onLimitChange: (limit: number) => void;
  onPageChange: (page: number) => void;
};

export function DataTablePagination({
  loading,
  limit,
  totalCount,
  page,
  onLimitChange,
  onPageChange,
}: DataTablePaginationProps) {
  const totalPages: number = Math.max(Math.ceil(totalCount / limit), 1);

  if (totalPages === 1) {
    return <></>;
  }

  const isFirst: boolean = page !== 1;
  const isLast: boolean = page !== totalPages;
  const pageOptions = Array.from({ length: totalPages }, (_, i: number) => i + 1);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 sm:flex-row text-sm font-small">
      <div className="col-span-1 sm:col-span-1 flex items-center justify-start gap-1">
        <p className="whitespace-nowrap">Rows per page</p>
        <SelectFormField
          disabled={loading}
          switchable={false}
          className="w-auto"
          name="limit"
          value={limit}
          onValueChange={(val) => {
            onLimitChange(val || LIMIT_PER_PAGE[0]);
          }}
          options={LIMIT_PER_PAGE.map((val: number) => ({ title: String(val), value: val }))}
        />
      </div>

      <div className="col-span-1 sm:col-span-1 flex items-center justify-end sm:justify-center gap-1">
        <span>Page</span>
        <SelectFormField
          disabled={loading}
          switchable={false}
          className="w-auto"
          name="page"
          value={page}
          onValueChange={(val) => {
            onPageChange(val || 1);
          }}
          options={pageOptions.map((opt) => ({ title: String(opt), value: opt }))}
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
