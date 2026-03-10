import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import MainScreen from "./Drawer Navigator/Stack Navigator/MainScreen";
import DetailsScreen from "./Drawer Navigator/Stack Navigator/DetailsScreen";
import ContactsScreen from "./Drawer Navigator/Stack Navigator/ContactsScreen";
import CustomDrawerContent from "./Drawer Navigator/Stack Navigator/CustomDrawerContent";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function NewsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{ title: "Новини", headerTitleAlign: "center" }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={({ route }) => ({
          title: route.params.title,
        })}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          swipeEdgeWidth: 120,
          headerShown: false,
        }}
      >
        <Drawer.Screen
          name="News"
          component={NewsStack}
          options={{ title: "Новини" }}
        />
        <Drawer.Screen
          name="Contacts"
          component={ContactsScreen}
          options={{ title: "Контакти" }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
