import { useState, useEffect } from "react";

export function useRoleTableFilters() {
  const [searchQuery, setSearchQuery] = useState("");
  const [genderFilter, setGenderFilter] = useState([]);
  const [changePageSize, setChangePageSize] = useState(10)
  const resetFilters = async () => {
    setSearchQuery("");
    setGenderFilter([]);
  };
  

  return {
    searchQuery,
    setSearchQuery,
    genderFilter,
    setGenderFilter,
    resetFilters,
    changePageSize,
    setChangePageSize,
  
  };
}
