import { View, ActivityIndicator } from "react-native";

export const withLoading = (Component) => {
  return ({ isLoading, ...props }) => {
    if (isLoading) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center", height:"100%" }}
        >
          <ActivityIndicator size={"large"} />
        </View>
      );
    }
    return <Component {...props} />;
  };
};
