import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Для іконок

const CustomTabBar = ({ activeTab, setActiveTab }) => {
  return (
    <View style={styles.container}>
      {/* Вкладка "Головна" */}
      <TouchableOpacity style={styles.tab} onPress={() => setActiveTab("Home")}>
        <Ionicons
          name="home-outline"
          size={24}
          color={activeTab === "Home" ? "blue" : "gray"}
        />
        <Text style={[styles.text, activeTab === "Home" && styles.activeText]}>
          Головна
        </Text>
      </TouchableOpacity>

      {/* Вкладка "Фотогалерея" */}
      <TouchableOpacity
        style={styles.tab}
        onPress={() => setActiveTab("Gallery")}
      >
        <Ionicons
          name="images-outline"
          size={24}
          color={activeTab === "Gallery" ? "blue" : "gray"}
        />
        <Text
          style={[styles.text, activeTab === "Gallery" && styles.activeText]}
        >
          Фотогалерея
        </Text>
      </TouchableOpacity>

      {/* Вкладка "Профіль" */}
      <TouchableOpacity
        style={styles.tab}
        onPress={() => setActiveTab("Profile")}
      >
        <Ionicons
          name="person-outline"
          size={24}
          color={activeTab === "Profile" ? "blue" : "gray"}
        />
        <Text
          style={[styles.text, activeTab === "Profile" && styles.activeText]}
        >
          Профіль
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Стилі для компонента
const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Вкладки будуть розташовані по горизонталі
    justifyContent: "space-around", // Розміщуємо вкладки рівномірно
    backgroundColor: "white",
    paddingVertical: 10, // Відступи по вертикалі
    borderTopWidth: 1, // Тінь зверху
    borderTopColor: "#ddd",
  },
  tab: {
    alignItems: "center", // Центруємо іконки і текст
  },
  text: {
    color: "gray", // Колір тексту
    fontSize: 12,
    marginTop: 5, // Відступ між іконкою і текстом
  },
  activeText: {
    color: "blue",
    fontWeight: "bold",
  },
});

export default CustomTabBar;
