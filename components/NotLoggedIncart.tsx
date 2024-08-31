import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
const NotLoggedIncart = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.message}>You need to login first</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            router.push("/register");
          }}
        >
          <View style={styles.btn}>
            <Text style={styles.btnText}>Register</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            router.push("/login");
          }}
        >
          <View style={styles.loginBtn}>
            <Text style={styles.loginBtnText}>Login</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NotLoggedIncart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  message: {
    marginBottom: 20,
    fontSize: 25,
    fontWeight: "500",
  },
  buttonContainer: {
    flexDirection: "column",
    gap: 10,
  },
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
    width: "100%",
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "600",
    color: "#fff",
  },
  loginBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#007aff",
    width: "100%",
  },
  loginBtnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "600",
    color: "#000",
  },
});
