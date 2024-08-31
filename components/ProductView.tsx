import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import useCartStore from "@/store/useCartStore";
const ProductView = ({ data }) => {
  const { bottom } = useSafeAreaInsets();
  const { handleAddCart, handleRemoveCart, checkIsProductInCart } = useCartStore();
  return (
    <>
      <ScrollView contentInsetAdjustmentBehavior="always">
        <Image
          source={{
            uri:
              data?.image ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsBGOs2225fFqTfnl5EKlrEUBn5-drby1x3Q&s",
          }}
          style={styles.image}
        />
        <View style={styles.contentContainer}>
          <View style={styles.priceRatingContainer}>
            <Text style={styles.priceText}>${data?.price}</Text>
            <Text style={styles.ratingText}>{data?.rating?.rate} ⭐️</Text>
          </View>
          <Text style={styles.titleText}>{data?.title}</Text>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{data?.description}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={[styles.addToCartContainer, { bottom }]}>
        {checkIsProductInCart(data?.id) ? (
          <TouchableOpacity
            style={[styles.addToCartButton, { backgroundColor: "red" }]}
            onPress={() => {
              handleRemoveCart(data?.id);
            }}
          >
            <Text style={styles.addToCartText}>Remove from cart </Text>
            <AntDesign name="shoppingcart" size={24} color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.addToCartButton, { backgroundColor: "#075eec" }]}
            onPress={() => {
                handleAddCart(data?.id);
            }}
          >
            <Text style={[styles.addToCartText]}>Add to cart </Text>
            <AntDesign name="shoppingcart" size={24} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export default ProductView;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 500,
    objectFit: "fill",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  contentContainer: {
    paddingHorizontal: 16,
    marginTop: 15,
    flexDirection: "column",
    gap: 10,
    marginBottom: 100
  },
  priceRatingContainer: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "space-between",
  },
  priceText: {
    fontWeight: "700",
    fontSize: 25,
  },
  ratingText: {
    fontWeight: "700",
    fontSize: 25,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  descriptionContainer: {
    flexDirection: "column",
    gap: 5,
  },
  descriptionTitle: {
    fontWeight: "700",
    fontSize: 15,
  },
  descriptionText: {
    fontSize: 15,
  },
  addToCartContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    padding: 20,
    height: 90,
  },
  addToCartButton: {
    height: "100%",
    justifyContent: "center",
    borderRadius: 20,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  addToCartText: {
    alignItems: "center",
    textAlign: "center",
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },
});
