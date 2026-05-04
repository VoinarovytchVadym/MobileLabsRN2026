import { View, Text, StyleSheet, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Header({ title = "MyApp", leftLabel = "Logo" }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingTop: insets.top }]}>
      <View style={styles.root}>
        <Pressable hitSlop={10}>
          <Text style={styles.leftText}>{leftLabel}</Text>
        </Pressable>

        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { borderBottomWidth: 1, borderBottomColor: "#e5e5e5" },
  root: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  left: { width: 40, justifyContent: "center" },
  leftDisabled: { opacity: 0.3 },
  right: { width: 40 },
  leftText: { fontSize: 18 },
  title: { flex: 1, textAlign: "center", fontSize: 18, fontWeight: "700" },
});
