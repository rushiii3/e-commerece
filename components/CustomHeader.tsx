import {
  FlatList,
  Image,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link, useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { fetchProductsSearch } from "@/api/api";
import { useDebounce } from "@/hooks/useDebounce";
import { Product } from "@/types";

const CustomHeader = () => {
  const { top } = useSafeAreaInsets();
  const [text, settext] = useState("");
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["products-search"],
    queryFn: fetchProductsSearch,
    staleTime: 180 * 1000, // 1 minute
  });
  const [filteredData, setfilteredData] = useState([]);

  const fetchSearchResults = async (product: string) => {
    const filter = data.filter((data: Product) =>
      data.title.toLowerCase().includes(product.toLowerCase())
    );
    setfilteredData(filter);
  };
  const debouncedSearch = useDebounce(fetchSearchResults, 500);

  const handleSearch = (text: string) => {
    settext(text);
    debouncedSearch(text);
  };
  const renderItemProducts = ({ item }: ListRenderItemInfo<Product>) => (
    <Link
      href={{
        pathname: "/[id]",
        params: { id: item.id },
      }}
    >
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <Text numberOfLines={1} style={styles.itemTitle}>
          {item.title}
        </Text>
      </View>
    </Link>
  );
  const router = useRouter();
  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <View style={styles.searchWrapper}>
        <View style={styles.search}>
          <View style={styles.searchIcon}>
            <Feather color="#848484" name="search" size={17} />
          </View>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Search"
            placeholderTextColor="#848484"
            returnKeyType="done"
            style={styles.searchControl}
            value={text}
            onChangeText={handleSearch}
          />
        </View>

        {filteredData.length > 0 && text !== "" && (
          <View style={styles.resultsContainer}>
            <FlatList
              data={filteredData}
              renderItem={renderItemProducts}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        )}
        {filteredData.length === 0 && text !== "" && (
          <Text style={styles.emptyText}>No results found</Text>
        )}
      </View>

      <TouchableOpacity onPress={() => router.push("/cart")}>
        <AntDesign name="shoppingcart" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F7F7F9",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  searchWrapper: {
    flex: 1,
    paddingTop: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: "#efefef",
    marginRight: 10,
  },
  search: {
    position: "relative",
    backgroundColor: "#efefef",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  searchIcon: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: 34,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  searchControl: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    paddingLeft: 34,
    width: "100%",
    fontSize: 16,
    fontWeight: "500",
  },
  resultsContainer: {
    backgroundColor: "white",
    position: "absolute",
    width: "100%",
    top: "100%",
    padding: 10,
    maxHeight: 300,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  itemImage: {
    height: 30,
    width: 30,
  },
  itemTitle: {
    paddingRight: 40,
  },
  loadingContainer: {
    position: "absolute",
    width: "100%",
    top: "100%",
    padding: 10,
    backgroundColor: "white",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    textAlign: "center",
    color: "red",
    paddingTop: 16,
  },
  emptyText: {
    textAlign: "center",
    paddingTop: 16,
    fontWeight: "500",
    fontSize: 15,
    color: "#9ca1ac",
  },
});
