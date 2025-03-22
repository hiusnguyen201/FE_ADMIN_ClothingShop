import { Search } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { SidebarInput } from '@/components/ui/sidebar';

export function SearchField({ value, onValueChange }) {
  return (
    <div className="relative">
      <Label htmlFor="search" className="sr-only">
        Search
      </Label>
      <SidebarInput
        name="search"
        value={value}
        onChange={(e) => {
          onValueChange(e.target.value);
        }}
        id="search"
        placeholder="Type to search..."
        className="h-9 pl-7 rounded border-[var(--color-primary)] font-normal"
      />
      <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
    </div>
  );
}
