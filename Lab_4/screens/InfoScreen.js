import { View, Text, StyleSheet } from "react-native";
import { formatBytes, getFileType, formatDate } from "../utils/helpers";

export default function InfoScreen({ route }) {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Детальна інформація</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Назва:</Text>
        <Text style={styles.value}>{item.name}</Text>

        <Text style={styles.label}>Тип:</Text>
        <Text style={styles.value}>
          {getFileType(item.name, item.isDirectory)}
        </Text>

        <Text style={styles.label}>Розмір:</Text>
        <Text style={styles.value}>
          {item.isDirectory ? "—" : formatBytes(item.size)}
        </Text>

        <Text style={styles.label}>Дата останньої модифікації:</Text>
        <Text style={styles.value}>{formatDate(item.modificationTime)}</Text>

        <Text style={styles.label}>Повний шлях:</Text>
        <Text style={styles.path}>{item.path}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 16,
    backgroundColor: "#fafafa",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 4,
    color: "#333",
  },
  value: {
    fontSize: 16,
    color: "#111",
  },
  path: {
    fontSize: 15,
    color: "#444",
  },
});
