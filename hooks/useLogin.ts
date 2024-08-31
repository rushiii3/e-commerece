import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";
import { loginUser } from "@/api/api";
import { useRouter } from "expo-router";
import { Dispatch, SetStateAction, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { loginType } from "@/types";

export const useLogin = () => {
  const authentication = useContext(AuthContext);

  const router = useRouter();
  const formSchema = yup.object().shape({
    password: yup
      .string()
      .trim()
      .min(4, "Password must be at least 8 characters")
      .required("Please enter your password"),
    username: yup.string().trim().required("Please input your username"),
  });
  const { control, handleSubmit, reset } = useForm<loginType>({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "all",
    resolver: yupResolver(formSchema),
  });

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: async (data) => {
      Alert.alert("Login successful", "You are now logged in!");
      await SecureStore.setItemAsync("token", data.token);
      reset();
      authentication?.setisAuthenticated(true);
      router.replace("/");
    },
    onError: (error: any) => {
      console.log("Login failed", error.message);
      Alert.alert("Login failed", error.message);
    },
  });

  const onSubmit = (data: loginType) => {
    mutation.mutate(data);
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    isLoading: mutation.isPending,
  };
};
