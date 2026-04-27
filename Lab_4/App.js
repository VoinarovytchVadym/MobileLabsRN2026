import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import EditorScreen from "./screens/EditorScreen";
import InfoScreen from "./screens/InfoScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Файловий менеджер" }}
        />
        <Stack.Screen
          name="Editor"
          component={EditorScreen}
          ф
          options={{ title: "Редагування файлу" }}
        />
        <Stack.Screen
          name="Info"
          component={InfoScreen}
          options={{ title: "Інформація про файл" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
