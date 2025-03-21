import { useState, useRef } from "react";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { BasicButton } from "@/components/custom/basic-button";

export default function SearchForm() {
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef();

  return (
    <div className="flex items-center w-full px-5 bg-[#E9E9E9] h-[50px] rounded-full">
      <Input
        ref={inputRef}
        type="name"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="p-0 pr-6 border-none h-full bg-[#E9E9E9] outline-none"
        placeholder="Tìm kiếm sản phẩm..."
        autoFocus
      />
      <BasicButton
        variant="ghost"
        size="icon"
        className="absolute rounded-full right-1"
      >
        <SearchIcon />
      </BasicButton>
    </div>
  );
}
