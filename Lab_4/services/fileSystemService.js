import * as FileSystem from "expo-file-system/legacy";

export async function readDirectory(path) {
  try {
    const names = await FileSystem.readDirectoryAsync(path);

    const items = await Promise.all(
      names.map(async (name) => {
        const fullPath = path + name;
        const info = await FileSystem.getInfoAsync(fullPath);

        return {
          name,
          path: fullPath,
          isDirectory: info.isDirectory,
          size: info.size ?? 0,
          modificationTime: info.modificationTime ?? null,
        };
      }),
    );

    items.sort((a, b) => {
      if (a.isDirectory && !b.isDirectory) return -1;
      if (!a.isDirectory && b.isDirectory) return 1;
      return a.name.localeCompare(b.name);
    });

    return items;
  } catch (error) {
    console.error("Помилка читання директорії:", error);
    return [];
  }
}
export async function readTextFile(filePath) {
  try {
    const content = await FileSystem.readAsStringAsync(filePath);
    return content;
  } catch (error) {
    console.error("Помилка читання файлу:", error);
    return "";
  }
}
export async function deleteItem(itemPath, isDirectory) {
  try {
    await FileSystem.deleteAsync(itemPath, { idempotent: true });
    return true;
  } catch (error) {
    console.error("Помилка видалення:", error);
    return false;
  }
}
export async function saveTextFile(filePath, content) {
  try {
    await FileSystem.writeAsStringAsync(filePath, content ?? "");
    return true;
  } catch (error) {
    console.error("Помилка збереження файлу:", error);
    return false;
  }
}
export async function getStorageInfo() {
  try {
    const total = await FileSystem.getTotalDiskCapacityAsync();
    const free = await FileSystem.getFreeDiskStorageAsync();
    const used = total - free;

    return { total, free, used };
  } catch (error) {
    console.error("Помилка отримання статистики памʼяті:", error);
    return { total: 0, free: 0, used: 0 };
  }
}

export function getRootPath() {
  return FileSystem.documentDirectory;
}

export async function createFolder(path, folderName) {
  try {
    const folderPath = path + folderName;
    await FileSystem.makeDirectoryAsync(folderPath, { intermediates: true });
    return true;
  } catch (error) {
    console.error("Помилка створення папки:", error);
    return false;
  }
}

export async function createTextFile(path, fileName, content) {
  try {
    const finalName = fileName.endsWith(".txt") ? fileName : `${fileName}.txt`;
    const filePath = path + finalName;

    await FileSystem.writeAsStringAsync(filePath, content ?? "");
    return true;
  } catch (error) {
    console.error("Помилка створення файлу:", error);
    return false;
  }
}
