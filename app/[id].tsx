import React from "react";
import { useGlobalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { fetchProductDetails } from "@/api/api";
import { withLoading } from "@/HOC/withLoader";
import ProductView from "@/components/ProductView";

const ProductCompoent = withLoading(ProductView);
const Page = () => {
  const { id } = useGlobalSearchParams<{ id: string }>();
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductDetails(parseInt(id)),
    enabled: !!id,
    staleTime: 60 * 1000, // 1 minute
  });
  return <ProductCompoent data={data} isLoading={isPending} />;
};

export default Page;
