import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import { withLoading } from "@/HOC/withLoader";
import FlatListProduct from "@/components/FlatListProduct";
import { useSearch } from "@/hooks/useSearch";

const FlatListWithLoader = withLoading(FlatListProduct);

export default function Index() {
  const {
    categoryData,
    data,
    handleAscending,
    handleCategory,
    isAscending,
    isPending,
    selectedCategory
  } = useSearch();
  const renderItemCategory = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          handleCategory(item);
        }}
      >
        <View
          style={[
            styles.pillContainer,
            selectedCategory.toLowerCase() === item.toLowerCase()
              ? styles.pillSelected
              : styles.pillUnselected,
          ]}
        >
          <Text
            style={[
              styles.pillText,
              selectedCategory.toLowerCase() === item.toLowerCase()
                ? styles.pillTextSelected
                : styles.pillTextUnselected,
            ]}
            numberOfLines={1}
          >
            {item.toUpperCase()}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F7F7F9" }}>
      <FlatList
        data={categoryData}
        renderItem={renderItemCategory}
        keyExtractor={(item) => item.toString()}
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 10,
        }}
        showsHorizontalScrollIndicator={false}
        style={{
          marginBottom: 10,
        }}
      />

      <View
        style={{
          paddingHorizontal: 16,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>New Arrivals</Text>
        <TouchableOpacity onPress={handleAscending}>
          {isAscending ? (
            <Octicons name="sort-desc" size={24} color="black" />
          ) : (
            <Octicons name="sort-asc" size={24} color="black" />
          )}
        </TouchableOpacity>
      </View>
      <FlatListWithLoader isLoading={isPending} data={data} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  video: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  header: {
    textTransform: "capitalize",
    fontSize: 36,
    color: "white",
    fontWeight: "900",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 60,
    gap: 20,
    paddingHorizontal: 20,
  },
  links: {
    flex: 1,
    backgroundColor: "#333333",
    padding: 15,
    borderRadius: 20,
    textAlign: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  pillContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  pillSelected: {
    backgroundColor: "black",
  },
  pillUnselected: {
    backgroundColor: "white",
  },
  pillText: {
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 24,
  },
  pillTextSelected: {
    color: "white",
  },
  pillTextUnselected: {
    color: "black",
  },
});
