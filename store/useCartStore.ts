import { create } from "zustand";
import { zustandStorage } from "./store";
import { Cart, CartState } from "@/types";

const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  // Load cart from MMKV storage on initialization
  initializeCart: async () => {
    const savedCart = await zustandStorage.getItem("cart");
    if (savedCart) {
      set({ cart: JSON.parse(savedCart) });
    }
  },
  handleAddCart: async (id: number) => {
    set((state) => {
      const updatedCart = [
        { id: id, quantity: Math.floor(Math.random() * 6) + 1 },
        ...state.cart,
      ];
      zustandStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    });
  },
  handleRemoveCart: async (id: number) => {
    set((state) => {
      const updatedCart = state.cart.filter((item) => item.id !== id);
      zustandStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    });
  },
  checkIsProductInCart: (id: number) => {
    return get().cart.some((item) => item.id === id);
  },
}));

export default useCartStore;
