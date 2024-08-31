import { Dispatch, SetStateAction } from "react";
export type signUpType = {
  username: string;
  phone: string;
  cpassword: string;
  password: string;
  email: string;
  lastname: string;
  firstname: string;
};

export type loginType = {
  username: string;
  password: string;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
};

interface Rating {
  rate: number;
  count: number;
}

export type ProductCart = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity: number;
  rating: Rating;
};

export type Cart = {
  id: number;
  quantity: number;
};

export type CartState = {
  cart: Cart[];
  initializeCart: () => Promise<void>;
  handleAddCart: (id: number) => Promise<void>;
  handleRemoveCart: (id: number) => Promise<void>;
  checkIsProductInCart: (id: number) => boolean;
};

export type AuthContextType = {
  setisAuthenticated: Dispatch<SetStateAction<boolean>>;
  isAuthenticated: boolean;
};

