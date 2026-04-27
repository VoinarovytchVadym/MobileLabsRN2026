export function formatBytes(bytes) {
  if (!bytes || bytes <= 0) return "0 Б";

  const sizes = ["Б", "КБ", "МБ", "ГБ"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}
export function getFileType(fileName, isDirectory) {
  if (isDirectory) return "Папка";

  const parts = fileName.split(".");
  if (parts.length < 2) return "Невідомий тип";

  return parts[parts.length - 1].toUpperCase();
}

export function formatDate(timestamp) {
  if (!timestamp) return "Невідомо";

  const date = new Date(timestamp * 1000);

  return date.toLocaleString("uk-UA");
}
export function getParentPath(path, rootPath) {
  if (path === rootPath) return rootPath;

  const trimmed = path.endsWith("/") ? path.slice(0, -1) : path;
  const lastSlashIndex = trimmed.lastIndexOf("/");

  if (lastSlashIndex === -1) return rootPath;

  const parent = trimmed.slice(0, lastSlashIndex + 1);

  return parent.length < rootPath.length ? rootPath : parent;
}
