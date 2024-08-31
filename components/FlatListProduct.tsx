import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import useCartStore from "@/store/useCartStore";

const FlatListProduct = React.memo(({ data }) => {
  const { handleAddCart, handleRemoveCart, checkIsProductInCart } =
    useCartStore();
  const router = useRouter();

  const renderItemCard = ({ item }) => {
    const isInCart = checkIsProductInCart(item.id);

    return (
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() =>
              isInCart ? handleRemoveCart(item.id) : handleAddCart(item.id)
            }
          >
            <MaterialIcons
              name={isInCart ? "remove-shopping-cart" : "shopping-cart"}
              size={20}
              color="white"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() =>
            router.push({ pathname: "/[id]", params: { id: item.id } })
          }
          style={styles.content}
        >
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.price}>${item.price}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItemCard}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      contentContainerStyle={styles.listContainer}
    />
  );
});

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 5,
    padding: 15,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    flexDirection: "column",
    gap: 5,
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    height: 200,
    width: "100%",
    borderRadius: 20,
  },
  cartButton: {
    backgroundColor: "black",
    position: "absolute",
    padding: 7,
    borderRadius: 50,
    right: 5,
  },
  content: {
    flex: 1,
  },
  textContainer: {
    flexDirection: "column",
    gap: 10,
  },
  title: {
    letterSpacing: 1,
    color: "black",
    marginTop: 5,
  },
  price: {
    letterSpacing: 1,
    color: "black",
    marginTop: 5,
    fontWeight: "bold",
  },
  listContainer: {
    paddingHorizontal: 5,
    marginTop: 10,
  },
});

export default FlatListProduct;
