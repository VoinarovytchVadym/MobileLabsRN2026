import { Stack, Redirect } from "expo-router";
import { useAuth } from "../../src/context/AuthContext";
import { ActivityIndicator, View } from "react-native";

export default function AuthLayout() {
  const { user, initializing } = useAuth();

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (user) {
    return <Redirect href="/(app)/profile" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
