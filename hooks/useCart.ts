import { fetchProductDetails } from "@/api/api";
import useCartStore from "@/store/useCartStore";
import { useQueries } from "@tanstack/react-query";
import { useEffect } from "react";

export const useCart = () => {
  const { cart, initializeCart } = useCartStore();

  useEffect(() => {
    initializeCart();
  }, [initializeCart]);

  const cartProducts = useQueries({
    queries: cart
      ? cart.map((product) => ({
          queryKey: ["cartproduct", product.id],
          queryFn: () => fetchProductDetails(product.id),
          staleTime: 120 * 1000, // 1 minute
        }))
      : [],
  });

  const combinedCartProducts = cartProducts?.map((query, index) => ({
    ...query.data,
    quantity: cart[index]?.quantity,
  }));
  // Calculate the total amount
  const totalAmount = combinedCartProducts?.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );
  return {
    totalAmount,
    isLoading: cartProducts[0]?.isLoading,
    data: combinedCartProducts,
  }
};
