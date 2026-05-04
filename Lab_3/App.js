import "react-native-gesture-handler";

import { useState } from "react";
import styled from "styled-components/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./src/screens/HomeScreen";
import TasksScreen from "./src/screens/TasksScreen";
import SettingsScreen from "./src/screens/SettingsScreen";

const Tab = createBottomTabNavigator();

const Root = styled(GestureHandlerRootView)`
  flex: 1;
`;

export default function App() {
  const [count, setCount] = useState(0);
  const [tapCount, setTapCount] = useState(0);
  const [doubleTapCount, setDoubleTapCount] = useState(0);
  const [longPressCount, setLongPressCount] = useState(0);
  const [swipeLeftCount, setSwipeLeftCount] = useState(0);
  const [swipeRightCount, setSwipeRightCount] = useState(0);
  const [dragCount, setDragCount] = useState(0);
  const [pinchCount, setPinchCount] = useState(0);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const resetProgress = () => {
    setCount(0);
    setTapCount(0);
    setDoubleTapCount(0);
    setLongPressCount(0);
    setSwipeLeftCount(0);
    setSwipeRightCount(0);
    setDragCount(0);
    setPinchCount(0);
  };

  const colors = isDarkTheme
    ? {
        background: "#121212",
        card: "#1E1E1E",
        text: "#FFFFFF",
        secondaryText: "#B0B0B0",
        circle: "#3B82F6",
        border: "#333333",
        danger: "#EF4444",
      }
    : {
        background: "#F5F7FB",
        card: "#FFFFFF",
        text: "#111111",
        secondaryText: "#555555",
        circle: "#2563EB",
        border: "#D9E0EA",
        danger: "#EF4444",
      };

  return (
    <Root>
      <NavigationContainer theme={isDarkTheme ? DarkTheme : DefaultTheme}>
        <Tab.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: colors.card },
            headerTitleStyle: { color: colors.text },
            tabBarStyle: {
              backgroundColor: colors.card,
              borderTopColor: colors.border,
            },
            tabBarActiveTintColor: colors.circle,
            tabBarInactiveTintColor: colors.secondaryText,
            sceneStyle: { backgroundColor: colors.background },
          }}
        >
          <Tab.Screen name="Home">
            {() => (
              <HomeScreen
                count={count}
                setCount={setCount}
                tapCount={tapCount}
                setTapCount={setTapCount}
                doubleTapCount={doubleTapCount}
                setDoubleTapCount={setDoubleTapCount}
                longPressCount={longPressCount}
                setLongPressCount={setLongPressCount}
                swipeLeftCount={swipeLeftCount}
                setSwipeLeftCount={setSwipeLeftCount}
                swipeRightCount={swipeRightCount}
                setSwipeRightCount={setSwipeRightCount}
                dragCount={dragCount}
                setDragCount={setDragCount}
                pinchCount={pinchCount}
                setPinchCount={setPinchCount}
                colors={colors}
              />
            )}
          </Tab.Screen>

          <Tab.Screen name="Tasks">
            {() => (
              <TasksScreen
                count={count}
                tapCount={tapCount}
                doubleTapCount={doubleTapCount}
                longPressCount={longPressCount}
                swipeLeftCount={swipeLeftCount}
                swipeRightCount={swipeRightCount}
                dragCount={dragCount}
                pinchCount={pinchCount}
                colors={colors}
              />
            )}
          </Tab.Screen>

          <Tab.Screen name="Settings">
            {() => (
              <SettingsScreen
                isDarkTheme={isDarkTheme}
                setIsDarkTheme={setIsDarkTheme}
                resetProgress={resetProgress}
                colors={colors}
              />
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </Root>
  );
}
