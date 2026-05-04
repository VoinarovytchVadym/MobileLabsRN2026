import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Card from "./Card"; // Імпортуємо компонент Card

// Масив даних для карток
const data = [
  {
    id: "1",
    title: "Картка 1",
    description: "Опис для картки 1",
    image:
      "https://i.pinimg.com/736x/44/98/b6/4498b6ef6034c4402a35ebdb757c9df9.jpg",
  },
  {
    id: "2",
    title: "Картка 2",
    description: "Опис для картки 2",
    image:
      "https://i.pinimg.com/736x/59/de/dd/59dedd3436112a65a1b3a3610567842e.jpg",
  },
  {
    id: "3",
    title: "Картка 3",
    description: "Опис для картки 3",
    image:
      "https://i.pinimg.com/736x/9e/f9/5b/9ef95b63a3f30dcafccae912f364f97a.jpg",
  },
  {
    id: "4",
    title: "Картка 1",
    description: "Опис для картки 1",
    image:
      "https://i.pinimg.com/736x/44/98/b6/4498b6ef6034c4402a35ebdb757c9df9.jpg",
  },
  {
    id: "5",
    title: "Картка 2",
    description: "Опис для картки 2",
    image:
      "https://i.pinimg.com/736x/59/de/dd/59dedd3436112a65a1b3a3610567842e.jpg",
  },
  {
    id: "6",
    title: "Картка 3",
    description: "Опис для картки 3",
    image:
      "https://i.pinimg.com/736x/9e/f9/5b/9ef95b63a3f30dcafccae912f364f97a.jpg",
  },
  {
    id: "7",
    title: "Картка 1",
    description: "Опис для картки 1",
    image:
      "https://i.pinimg.com/736x/44/98/b6/4498b6ef6034c4402a35ebdb757c9df9.jpg",
  },
  {
    id: "8",
    title: "Картка 2",
    description: "Опис для картки 2",
    image:
      "https://i.pinimg.com/736x/59/de/dd/59dedd3436112a65a1b3a3610567842e.jpg",
  },
  {
    id: "9",
    title: "Картка 3",
    description: "Опис для картки 3",
    image:
      "https://i.pinimg.com/736x/9e/f9/5b/9ef95b63a3f30dcafccae912f364f97a.jpg",
  },
];

export default function Home() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Відображаємо кожну картку за допомогою компонента Card */}
      {data.map((item) => (
        <Card
          key={item.id}
          image={item.image}
          title={item.title}
          description={item.description}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
