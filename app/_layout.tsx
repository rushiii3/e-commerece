import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomHeader from "@/components/CustomHeader";
import { AuthContext, AuthProvider } from "@/context/AuthContext";
import { useContext, useEffect } from "react";
const queryClient = new QueryClient();

const RootLayout = () => {
  const router = useRouter();
  const authentication = useContext(AuthContext);
  useEffect(() => {
    const checkToken = async () => {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        authentication?.setisAuthenticated(true);
        console.log("Token available");
      } else {
        authentication?.setisAuthenticated(false);
        console.log("No token found");
      }
    };

    checkToken();
  }, []);
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => <CustomHeader />,
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          headerBackVisible: false,
          headerBackTitleVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={"black"} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          headerShown: true,
          // headerTransparent: true,
          headerTitle: "",
          headerBackVisible: false,
          headerBackTitleVisible: false,
          headerShadowVisible:false,
          headerStyle: { backgroundColor: '#e8ecf4' },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={"black"} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: true,
          headerTitle: "Product Details",
          headerShadowVisible: false,
          headerBackVisible: false,
          headerBackTitleVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={"black"} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="cart"
        options={{
          headerShown: true,
          headerTitle: "Cart",
          headerBackVisible: false,
          headerBackTitleVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={"black"} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

const Layout = () => {
  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <RootLayout />
        </AuthProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
};

export default Layout;
