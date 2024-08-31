import React, { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { withAuth } from "@/HOC/withAuth";
import Cart from "@/components/Cart";
import { withLoading } from "@/HOC/withLoader";
import { useCart } from "@/hooks/useCart";
import { AuthContextType } from "@/types";

const CartWithAuth = withAuth(Cart);
const CartWithAuthLoading = withLoading(CartWithAuth);
const Page = () => {
  const authentication = useContext(AuthContext);
  const { data, isLoading, totalAmount } = useCart();

  return (
    <CartWithAuthLoading
      isAuthenticated={authentication?.isAuthenticated}
      data={data}
      isLoading={isLoading}
      totalAmount={totalAmount}
    />
  );
};

export default Page;
