import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CommandPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const CommandPagination = ({ page, totalPages, onPageChange }: CommandPaginationProps) => {
  totalPages = Math.max(1, totalPages);
  return (
    <div className="flex items-center justify-between border-t p-2">
      <span className="text-xs text-muted-foreground">
        Page {page} of {totalPages}
      </span>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          className="h-6 w-6"
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page <= 1}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous page</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-6 w-6"
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page >= totalPages}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next page</span>
        </Button>
      </div>
    </div>
  );
};
