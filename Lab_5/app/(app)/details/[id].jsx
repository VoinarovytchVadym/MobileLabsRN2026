import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { products } from "../../../data/products";

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();

  const product = products.find((item) => item.id === id);

  if (!product) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Товар не знайдено</Text>

        <Pressable
          style={styles.backButton}
          onPress={() => router.replace("/catalog")}
        >
          <Text style={styles.backButtonText}>До каталогу</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>{product.price} грн</Text>
        <Text style={styles.description}>{product.description}</Text>

        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Назад</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 320,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 10,
  },
  price: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2563eb",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#374151",
    marginBottom: 24,
  },
  backButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 10,
  },
  backButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  notFoundText: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
});
