import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import { readTextFile, saveTextFile } from "../services/fileSystemService";

export default function EditorScreen({ route, navigation }) {
  const { filePath, fileName } = route.params;

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({ title: fileName });
    loadFile();
  }, []);

  const loadFile = async () => {
    const fileContent = await readTextFile(filePath);
    setContent(fileContent);
    setLoading(false);
  };

  const handleSave = async () => {
    const success = await saveTextFile(filePath, content);

    if (success) {
      Alert.alert("Успіх", "Файл успішно збережено");
    } else {
      Alert.alert("Помилка", "Не вдалося зберегти файл");
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Завантаження файлу...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.fileName}>{fileName}</Text>

      <TextInput
        style={styles.editor}
        value={content}
        onChangeText={setContent}
        multiline
        placeholder="Введи текст..."
        textAlignVertical="top"
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Зберегти зміни</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fileName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  editor: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fafafa",
    marginBottom: 14,
  },
  saveButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
