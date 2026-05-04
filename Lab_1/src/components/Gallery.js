import React from "react";
import { FlatList, View, Text, Image, StyleSheet } from "react-native";

// Масив даних для галереї
const gallery = [
  {
    id: "1",
    title: "Зображення 1",
    imageUrl:
      "https://i.pinimg.com/474x/1c/ff/ab/1cffabe7dcc350a2abfe5fbea5541326.jpg",
  },
  {
    id: "2",
    title: "Зображення 2",
    imageUrl:
      "https://i.pinimg.com/1200x/a2/50/5c/a2505c7169efda6507c8b3ef3d61f539.jpg",
  },
  {
    id: "3",
    title: "Зображення 3",
    imageUrl:
      "https://i.pinimg.com/736x/20/8b/de/208bdee2399b1b85dba322c01c52cec8.jpg",
  },
  {
    id: "4",
    title: "Зображення 4",
    imageUrl:
      "https://i.pinimg.com/736x/ac/28/28/ac28286e7693646b80a9873beee68822.jpg",
  },
  {
    id: "5",
    title: "Зображення 5",
    imageUrl:
      "https://i.pinimg.com/1200x/bb/d7/09/bbd709b51b3f1890f1fca413dd3b288c.jpg",
  },
  {
    id: "6",
    title: "Зображення 6",
    imageUrl:
      "https://i.pinimg.com/736x/e4/66/1e/e4661ea6ea66006cb25482b5e07c030c.jpg",
  },
  // Додайте більше елементів за потреби
];

export default function Gallery() {
  return (
    <FlatList
      data={gallery} // Масив даних для галереї
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
        </View>
      )}
      keyExtractor={(item) => item.id} // Унікальний ключ для кожної картки
      numColumns={2} // Відображаємо 2 колонки
      columnWrapperStyle={styles.row} // Стиль для ряду елементів
    />
  );
}

const styles = StyleSheet.create({
  row: {
    justifyContent: "space-between", // Рівномірно розміщуємо елементи в ряду
  },
  card: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5, // для Android тінь
    width: "48%", // Картка займає 48% ширини, щоб помістити 2 елементи в ряду
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
});
