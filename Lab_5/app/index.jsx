import { Redirect } from "expo-router";
import { useAuth } from "../context/AuthContext";

export default function IndexScreen() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Redirect href="/catalog" />
  ) : (
    <Redirect href="/login" />
  );
}
