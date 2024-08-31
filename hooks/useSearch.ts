import { fetchCategories, fetchProducts } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useSearch = () => {
  const [isAscending, setisAscending] = useState(false);
  const [selectedCategory, setselectedCategory] = useState("ALL");
  const {
    isPending: isCategeoryLoading,
    isError: isCaetgoryError,
    data: categoryData,
    error: categoryerror,
  } = useQuery({
    queryKey: ["AllCategories"],
    queryFn: fetchCategories,
    staleTime: 60 * 1000, // 1 minute
    select: (data) => {
      return ["ALL", ...data]; // Add the new category to the array
    },
  });

  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: ["products", selectedCategory, isAscending],
    queryFn: () => fetchProducts(selectedCategory, isAscending),
    staleTime: 60 * 1000, // 1 minute
  });

  useEffect(() => {
    refetch();
  }, [selectedCategory, isAscending, refetch]);

  const handleCategory = (category: string) => {
    setselectedCategory(category);
  };
  const handleAscending = () => {
    setisAscending(!isAscending);
  };

  return {
    handleCategory,
    handleAscending,
    categoryData,
    isAscending,
    isPending,
    data,
    selectedCategory
  };
};
