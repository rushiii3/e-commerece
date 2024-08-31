import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Link } from "expo-router";
import CustomTextInput from "@/components/CustomTextInput";
import { useLogin } from "@/hooks/useLogin";
const Page = () => {
  const { control, handleSubmit, isLoading, onSubmit } = useLogin();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e8ecf4" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome back!</Text>
          <Text style={styles.subtitle}>Sign in to your account</Text>
        </View>
        <View style={styles.form}>
          <CustomTextInput
            control={control}
            name="username"
            label="Username"
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="while-editing"
            placeholder="joedoe99"
            placeholderTextColor="#6b7280"
          />
          <CustomTextInput
            control={control}
            name="password"
            label="Password"
            autoCorrect={false}
            placeholder="********"
            placeholderTextColor="#6b7280"
            secureTextEntry={true}
          />
          <View style={styles.formAction}>
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              disabled={isLoading}
            >
              <View style={styles.btn}>
                <Text style={styles.btnText}>
                  {isLoading ? "Signing in ...." : "Sign in"}{" "}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <Link href={"/register"}>
            <Text style={styles.formFooter}>
              Don't have an account?{" "}
              <Text style={{ textDecorationLine: "underline" }}>Sign up</Text>
            </Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  header: {
    marginVertical: 36,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1d1d1d",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
    textAlign: "center",
  },
  /** Form */
  form: {
    marginBottom: 24,
  },
  formAction: {
    marginVertical: 24,
  },
  formFooter: {
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    textAlign: "center",
  },
  /** Input */
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
  },
  inputControl: {
    height: 44,
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
  },
  /** Button */
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: "#007aff",
    borderColor: "#007aff",
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "600",
    color: "#fff",
  },
});
