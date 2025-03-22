import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectGroup, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

export function DataTablePagination({ totalPages, currentPage, onPageChange }) {
  const renderSelectPage = () => {
    const selectPageItems = [];

    for (let i = 1; i <= totalPages; i++) {
      selectPageItems.push(
        <SelectItem className="text-[var(--color-primary)] font-normal" key={i} value={i}>
          {i}
        </SelectItem>
      );
    }

    return selectPageItems;
  };

  return (
    <div className="flex items-center justify-end space-x-2 py-4 select-none">
      <div className="flex-1 text-sm text-muted-foreground flex items-center gap-1">
        <span className="text-[var(--color-primary)] font-normal">Page</span>
        <Select onValueChange={onPageChange} value={currentPage}>
          <SelectTrigger className="w-auto min-w-[58px] rounded border-[var(--color-secondary)] text-[var(--color-primary)] font-normal">
            <SelectValue placeholder={currentPage} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>{renderSelectPage()}</SelectGroup>
          </SelectContent>
        </Select>
        <span className="">of</span>
        <span className="text-[var(--color-primary)] font-normal">{totalPages}</span>
      </div>
      <div className="space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            onPageChange(Math.max(1, currentPage - 1));
          }}
          disabled={currentPage === 1}
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            onPageChange(Math.min(currentPage + 1, totalPages));
          }}
          disabled={currentPage === totalPages}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
