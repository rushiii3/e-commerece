import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Link } from "expo-router";
import CustomTextInput from "@/components/CustomTextInput";
import { useRegister } from "@/hooks/useRegister";

const Page = () => {
  const { control, handleSubmit, isLoading, onSubmit } = useRegister();
  const KeyBoardVerticalOffSet = Platform.OS === "ios" ? 50 : 40;

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={KeyBoardVerticalOffSet}
      behavior="padding"
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentInsetAdjustmentBehavior="always"
          automaticallyAdjustContentInsets={true}
          automaticallyAdjustKeyboardInsets
        >
          <View style={styles.header}>
            <Text style={styles.title}>Let's Get Started!</Text>
            <Text style={styles.subtitle}>
              Fill in the fields below to get started with your new account.
            </Text>
          </View>
          <View style={styles.form}>
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <CustomTextInput
                  control={control}
                  name="firstname"
                  label="First Name"
                  clearButtonMode="while-editing"
                  placeholder="John"
                  placeholderTextColor="#6b7280"
                />
              </View>
              <View style={{ flex: 1 }}>
                <CustomTextInput
                  control={control}
                  name="lastname"
                  label="Last Name"
                  clearButtonMode="while-editing"
                  placeholder="Doe"
                  placeholderTextColor="#6b7280"
                />
              </View>
            </View>
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
              name="email"
              label="Email"
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              keyboardType="email-address"
              placeholder="john@example.com"
              placeholderTextColor="#6b7280"
            />
            <CustomTextInput
              control={control}
              name="phone"
              label="Phone number"
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              keyboardType="phone-pad"
              placeholder="71xxxxxx90"
              placeholderTextColor="#6b7280"
              maxLength={10}
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
            <CustomTextInput
              control={control}
              name="cpassword"
              label="Confirm Password"
              autoCorrect={false}
              placeholder="********"
              placeholderTextColor="#6b7280"
              secureTextEntry={true}
            />

            <View style={styles.formAction}>
              <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Get Started</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <Link href="/login" asChild>
            <Text style={styles.formFooter}>
              Already have an account?{" "}
              <Text style={styles.signInText}>Sign in</Text>
            </Text>
          </Link>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8ecf4",
  },
  safeArea: {
    flex: 1,
  },
  header: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 31,
    fontWeight: "700",
    color: "#1D2A32",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
  },
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flex: 1,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  formFooter: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
    textAlign: "center",
    letterSpacing: 0.15,
  },
  signInText: {
    textDecorationLine: "underline",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "#075eec",
    borderColor: "#075eec",
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },
});
