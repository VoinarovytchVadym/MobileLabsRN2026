import "react-native-gesture-handler"; // Імпортуємо для роботи з жестами
import React from "react";
import { NavigationContainer } from "@react-navigation/native"; // Для контейнера навігації
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"; // Для вкладок зверху
import { SafeAreaProvider } from "react-native-safe-area-context"; // SafeAreaProvider
import { Ionicons } from "@expo/vector-icons"; // Для іконок
import Header from "./src/components/Header"; // Імпортуємо Header
import Gallery from "./src/components/Gallery"; // Імпортуємо компонент галереї
import Home from "./src/components/Home"; // Імпортуємо компонент головної сторінки
import Registration from "./src/components/Registration"; // Імпортуємо компонент реєстрації

const Tab = createMaterialTopTabNavigator(); // Створюємо Top Tab Navigator

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {/* Можна обгорнути Header, якщо потрібно */}
        <Header />

        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            tabBarLabelStyle: { fontSize: 12 }, // Стиль тексту на вкладках
            tabBarIndicatorStyle: { backgroundColor: "blue" }, // Колір індикатора
          }}
        >
          {/* Вкладка "Головна" */}
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarLabel: "Головна",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home-outline" size={size} color={color} />
              ),
            }}
          />

          {/* Вкладка "Галерея" */}
          <Tab.Screen
            name="Gallery"
            component={Gallery}
            options={{
              tabBarLabel: "Галерея",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="images-outline" size={size} color={color} />
              ),
            }}
          />

          {/* Вкладка "Профіль" */}
          <Tab.Screen
            name="Profile"
            component={Registration}
            options={{
              tabBarLabel: "Профіль",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person-outline" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
