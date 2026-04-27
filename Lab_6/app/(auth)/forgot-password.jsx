import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { Link } from "expo-router";
import { useAuth } from "../../src/context/AuthContext";

export default function ForgotPasswordScreen() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");

  const handleReset = async () => {
    try {
      await resetPassword(email.trim());
      Alert.alert("Успіх", "Лист для скидання пароля надіслано");
    } catch (error) {
      Alert.alert("Помилка", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Відновлення пароля</Text>

      <TextInput
        style={styles.input}
        placeholder="Введіть Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <Button title="Надіслати лист" onPress={handleReset} />

      <View style={styles.links}>
        <Link href="/(auth)/login">Назад до входу</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    padding: 12,
  },
  links: {
    marginTop: 16,
    alignItems: "center",
  },
});
