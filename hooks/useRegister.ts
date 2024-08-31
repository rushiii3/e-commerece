import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/api/api";
import { Alert } from "react-native";
import { signUpType } from "@/types";
export const useRegister = () => {
  const formSchema = yup.object().shape({
    firstname: yup
      .string()
      .trim()
      .required("Please enter your firstname")
      .min(3, "First name must be at least 3 characters"),
    lastname: yup
      .string()
      .trim()
      .required("Please enter your lastname")
      .min(3, "Last name must be at least 3 characters"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Please enter your email address"),
    password: yup
      .string()
      .trim()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
        "Password must contain at least one letter, one number, and one special character"
      )
      .required("Please enter your password"),
    cpassword: yup
      .string()
      .trim()
      .required("Please input your confirm password")
      .oneOf([yup.ref("password"), ""], "Passwords must match"),
    phone: yup
      .string()
      .trim()
      .required("Please enter your phone number")
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
    username: yup.string().trim().required("Please input your username"),
  });
  const { control, handleSubmit, reset } = useForm<signUpType>({
    defaultValues: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      cpassword: "",
    },
    mode: "all",
    resolver: yupResolver(formSchema),
  });

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: async (data, variables, context) => {
      console.log(data);
      Alert.alert("User added successfully", JSON.stringify(data.id));
      reset();
    },
    onError: (error, variables, context) => {
      console.log("failed to add", error.message);
      Alert.alert("Failed", error.message);
    },
  });

  const onSubmit = (data:signUpType) => {
    mutation.mutate(data);
  };
  return {
    control,
    handleSubmit,
    onSubmit,
    isLoading: mutation.isPending,
  };
};
