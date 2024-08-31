import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";
import { loginUser } from "@/api/api";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export const useLogin = () => {
  const { setisAuthenticated } = useContext(AuthContext);

  const router = useRouter();
  const formSchema = yup.object().shape({
    password: yup
      .string()
      .trim()
      .min(4, "Password must be at least 8 characters")
      .required("Please enter your password"),
    username: yup.string().trim().required("Please input your username"),
  });
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "all",
    resolver: yupResolver(formSchema),
  });

  // Define the mutation using react-query's useMutation
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: async (data) => {
      Alert.alert("Login successful", "You are now logged in!");
      await SecureStore.setItemAsync("token", data.token);
      reset();
      setisAuthenticated(true);
      router.replace('/');
    },
    onError: (error: any) => {
      console.log("Login failed", error.message);
      Alert.alert("Login failed", error.message);
    },
  });

  // Return the necessary hooks and handlers
  const onSubmit = (data: { username: string; password: string }) => {
    mutation.mutate(data);
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    isLoading: mutation.isPending,
  };
};
