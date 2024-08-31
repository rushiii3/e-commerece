import {
  FlatList,
  Image,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link } from "expo-router";
import useCartStore from "@/store/useCartStore";
import RazorpayCheckout from "react-native-razorpay";
import { ProductCart } from "@/types";

type Cart = {
  data: ProductCart[];
  totalAmount: number;
};
const Cart = ({ data, totalAmount }: Cart) => {
  console.log((totalAmount * 100).toFixed(2));
  const { bottom } = useSafeAreaInsets();
  const { handleRemoveCart } = useCartStore();

  const renderItem = ({ item }: ListRenderItemInfo<ProductCart>) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={{ uri: item?.image }} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text numberOfLines={2} style={styles.itemTitle}>
            {item?.title}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.itemPrice}>${item?.price}</Text>
            <Text style={styles.itemPrice}>No. of item {item?.quantity}</Text>
          </View>

          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => {
              handleRemoveCart(item.id);
            }}
          >
            <Text style={styles.removeButtonText}>Remove from cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "800", fontSize: 25 }}>
                Your cart is empty
              </Text>
              <Link href={"/"}>
                <Text>Shop now</Text>
              </Link>
            </View>
          );
        }}
      />
      {data.length > 0 && (
        <View style={[styles.checkoutContainer, { bottom }]}>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => {
              var options = {
                description: "Credits towards consultation",
                image: "../assets/images/icon.png",
                currency: "USD",
                key: "rzp_test_cA6wZvVTsahL8l", // Your api key
                amount: `${(totalAmount * 100).toFixed(2)}`,
                name: "GenGlobally",
                theme: { color: "#F37254" },
              };
              RazorpayCheckout.open(options)
                .then((data) => {
                  // handle success
                  alert(`Success: ${data.razorpay_payment_id}`);
                })
                .catch((error) => {
                  console.log(error);

                  // handle failure
                  alert(`Error: ${error.code} | ${error.description}`);
                });
            }}
          >
            <Text style={styles.checkoutText}>Checkout</Text>
            <MaterialIcons
              name="shopping-cart-checkout"
              size={24}
              color="white"
            />
            <Text style={styles.checkoutText}>${totalAmount}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    padding: 10,
    backgroundColor: "white",
  },
  itemContainer: {
    marginBottom: 10,
    flexDirection: "row",
  },
  itemImage: {
    height: 100,
    width: 100,
    borderRadius: 20,
  },
  itemDetails: {
    padding: 5,
    flex: 1,
  },
  itemTitle: {
    marginBottom: 5,
  },
  itemPrice: {
    fontWeight: "900",
    fontSize: 15,
  },
  removeButton: {
    backgroundColor: "red",
    marginTop: "auto",
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  removeButtonText: {
    color: "white",
  },
  checkoutContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    padding: 20,
    height: 90,
  },
  checkoutButton: {
    height: "100%",
    justifyContent: "center",
    backgroundColor: "#BE8400",
    borderRadius: 20,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  checkoutText: {
    textAlign: "center",
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },
});
