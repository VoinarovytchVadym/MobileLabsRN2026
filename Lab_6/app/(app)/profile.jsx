import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { router } from "expo-router";
import { useAuth } from "../../src/context/AuthContext";

export default function ProfileScreen() {
  const { user, getProfile, saveProfile, logout, removeAccount } = useAuth();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");

  const [confirmEmail, setConfirmEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const profile = await getProfile();

      if (profile) {
        setName(profile.name || "");
        setAge(profile.age || "");
        setCity(profile.city || "");
      }
    } catch (error) {
      Alert.alert("Помилка", error.message);
    }
  };

  const handleSave = async () => {
    try {
      await saveProfile({
        name,
        age,
        city,
      });

      Alert.alert("Успіх", "Профіль збережено");
    } catch (error) {
      Alert.alert("Помилка", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/(auth)/login");
    } catch (error) {
      Alert.alert("Помилка", error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await removeAccount(confirmEmail.trim(), confirmPassword);
      Alert.alert("Успіх", "Акаунт видалено");
      router.replace("/(auth)/login");
    } catch (error) {
      Alert.alert("Помилка", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Профіль</Text>

      <Text style={styles.label}>Email: {user?.email}</Text>

      <TextInput
        style={styles.input}
        placeholder="Ім’я"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Вік"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Місто"
        value={city}
        onChangeText={setCity}
      />

      <Button title="Зберегти / Оновити профіль" onPress={handleSave} />

      <View style={styles.separator} />

      <Button title="Вийти" onPress={handleLogout} />

      <View style={styles.separator} />

      <Text style={styles.deleteTitle}>Видалення акаунта</Text>

      <TextInput
        style={styles.input}
        placeholder="Підтвердіть Email"
        value={confirmEmail}
        onChangeText={setConfirmEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Підтвердіть пароль"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <Button title="Видалити акаунт" onPress={handleDelete} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 12,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    padding: 12,
  },
  separator: {
    height: 12,
  },
  deleteTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 16,
    textAlign: "center",
  },
});
