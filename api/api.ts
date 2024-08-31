import axios from "axios";

const API_BASE_URL = "https://fakestoreapi.com";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const loginUser = async (data) => {
  try {
    const response = await api.post("/auth/login", data);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const registerUser = async (data) => {
  try {
    const response = await api.post("/users", {
      email: data.email,
      username: data.username,
      password: data.password,
      name: {
        firstname: data.firstname,
        lastname: data.lastname,
      },
      address: {
        city: "kilcoole",
        street: "7835 new road",
        number: 3,
        zipcode: "12926-3874",
        geolocation: {
          lat: "-37.3159",
          long: "81.1496",
        },
      },
      phone: data.phone,
    });
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

export const fetchProductDetails = async (productId) => {
  try {
    const response = await api.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Fetch product details failed:", error);
    throw error;
  }
};

export const fetchCartDetails = async () => {
  try {
    const response = await api.get("/carts/user/4");
    return response.data;
  } catch (error) {
    console.error("Fetch cart details failed:", error);
    throw error;
  }
};

export const fetchProducts = async (category = "all", isAscending = true) => {
  try {
    let url = "products";
    if (category.toLowerCase() !== "all") {
      url = `products/category/${category}`;
    }
    if (!isAscending) {
      url += "?sort=desc";
    }
    const response = await api.get(`/${url}`);
    return response.data;
  } catch (error) {
    console.error("Fetch products failed:", error);
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await api.get("/products/categories");
    return response.data;
  } catch (error) {
    console.error("Fetch categories failed:", error);
    throw error;
  }
};

export const fetchProductsSearch = async () => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    console.error("Fetch products search failed:", error);
    throw error;
  }
};
