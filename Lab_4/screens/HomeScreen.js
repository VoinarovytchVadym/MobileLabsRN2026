import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import {
  readDirectory,
  getStorageInfo,
  getRootPath,
  createFolder,
  createTextFile,
  deleteItem,
} from "../services/fileSystemService";
import { formatBytes, getParentPath } from "../utils/helpers";

export default function HomeScreen({ navigation }) {
  const rootPath = getRootPath();

  const [currentPath, setCurrentPath] = useState(rootPath);
  const [items, setItems] = useState([]);
  const [storage, setStorage] = useState({
    total: 0,
    free: 0,
    used: 0,
  });

  const [folderModalVisible, setFolderModalVisible] = useState(false);
  const [fileModalVisible, setFileModalVisible] = useState(false);

  const [folderName, setFolderName] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileContent, setFileContent] = useState("");

  const loadData = async (path = currentPath) => {
    const directoryItems = await readDirectory(path);
    const storageInfo = await getStorageInfo();

    setItems(directoryItems);
    setStorage(storageInfo);
  };

  useEffect(() => {
    loadData(rootPath);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData(currentPath);
    }, [currentPath]),
  );

  const openItem = (item) => {
    if (item.isDirectory) {
      setCurrentPath(item.path + "/");
      return;
    }

    if (item.name.endsWith(".txt")) {
      navigation.navigate("Editor", {
        filePath: item.path,
        fileName: item.name,
      });
      return;
    }

    Alert.alert("Інфо", "Поки що відкриваються тільки .txt файли");
  };

  const goUp = () => {
    if (currentPath === rootPath) return;

    const parentPath = getParentPath(currentPath, rootPath);
    setCurrentPath(parentPath);
  };

  const handleDelete = (item) => {
    Alert.alert(
      "Підтвердження",
      `Видалити ${item.isDirectory ? "папку" : "файл"} "${item.name}"?`,
      [
        { text: "Скасувати", style: "cancel" },
        {
          text: "Видалити",
          style: "destructive",
          onPress: async () => {
            const success = await deleteItem(item.path, item.isDirectory);

            if (success) {
              loadData(currentPath);
            } else {
              Alert.alert("Помилка", "Не вдалося видалити обʼєкт");
            }
          },
        },
      ],
    );
  };

  const openItemMenu = (item) => {
    Alert.alert(item.name, "Оберіть дію", [
      {
        text: "Інформація",
        onPress: () => navigation.navigate("Info", { item }),
      },
      {
        text: "Видалити",
        style: "destructive",
        onPress: () => handleDelete(item),
      },
      {
        text: "Скасувати",
        style: "cancel",
      },
    ]);
  };

  const handleCreateFolder = async () => {
    if (!folderName.trim()) {
      Alert.alert("Помилка", "Введи назву папки");
      return;
    }

    const success = await createFolder(currentPath, folderName.trim());

    if (success) {
      setFolderName("");
      setFolderModalVisible(false);
      loadData(currentPath);
    } else {
      Alert.alert("Помилка", "Не вдалося створити папку");
    }
  };

  const handleCreateFile = async () => {
    if (!fileName.trim()) {
      Alert.alert("Помилка", "Введи назву файлу");
      return;
    }

    const success = await createTextFile(
      currentPath,
      fileName.trim(),
      fileContent,
    );

    if (success) {
      setFileName("");
      setFileContent("");
      setFileModalVisible(false);
      loadData(currentPath);
    } else {
      Alert.alert("Помилка", "Не вдалося створити файл");
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => openItem(item)}
      onLongPress={() => openItemMenu(item)}
    >
      <Text style={styles.itemIcon}>{item.isDirectory ? "📁" : "📄"}</Text>

      <View style={styles.itemContent}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemMeta}>
          {item.isDirectory ? "Папка" : `Файл • ${formatBytes(item.size)}`}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.storageBox}>
        <Text style={styles.storageTitle}>Памʼять пристрою</Text>
        <Text>Загалом: {formatBytes(storage.total)}</Text>
        <Text>Вільно: {formatBytes(storage.free)}</Text>
        <Text>Зайнято: {formatBytes(storage.used)}</Text>
      </View>

      <View style={styles.pathBox}>
        <Text style={styles.pathLabel}>Поточний шлях:</Text>
        <Text style={styles.pathText}>{currentPath}</Text>

        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              currentPath === rootPath && styles.disabledButton,
            ]}
            onPress={goUp}
            disabled={currentPath === rootPath}
          >
            <Text style={styles.actionButtonText}>⬆ Вгору</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setFolderModalVisible(true)}
          >
            <Text style={styles.actionButtonText}>📁 Нова папка</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setFileModalVisible(true)}
          >
            <Text style={styles.actionButtonText}>📄 Новий файл</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.path}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>Папка порожня</Text>}
        contentContainerStyle={items.length === 0 && styles.emptyContainer}
      />

      <Modal
        visible={folderModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFolderModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Створити папку</Text>

            <TextInput
              style={styles.input}
              placeholder="Назва папки"
              value={folderName}
              onChangeText={setFolderName}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setFolderModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Скасувати</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleCreateFolder}
              >
                <Text style={styles.modalButtonText}>Створити</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={fileModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFileModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Створити .txt файл</Text>

            <TextInput
              style={styles.input}
              placeholder="Назва файлу"
              value={fileName}
              onChangeText={setFileName}
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Початковий вміст"
              value={fileContent}
              onChangeText={setFileContent}
              multiline
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setFileModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Скасувати</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleCreateFile}
              >
                <Text style={styles.modalButtonText}>Створити</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  storageBox: {
    padding: 14,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 14,
    backgroundColor: "#f7f7f7",
  },
  storageTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  pathBox: {
    marginBottom: 14,
  },
  pathLabel: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  pathText: {
    marginBottom: 10,
    color: "#444",
  },
  actionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  actionButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: "#aaa",
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#fafafa",
  },
  itemIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
  },
  itemMeta: {
    marginTop: 4,
    color: "#666",
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 20,
  },
  modalBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  modalButton: {
    flex: 1,
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
