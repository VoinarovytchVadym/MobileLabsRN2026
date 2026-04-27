import { View, Text, Switch, Pressable } from "react-native";

export default function SettingsScreen({
  isDarkTheme,
  setIsDarkTheme,
  resetProgress,
  colors,
}) {
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        justifyContent: "center",
        backgroundColor: colors.background,
      }}
    >
      <View
        style={{
          backgroundColor: colors.card,
          borderRadius: 20,
          padding: 20,
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
            color: colors.text,
            marginBottom: 20,
          }}
        >
          Налаштування
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: colors.text,
            }}
          >
            Темна тема
          </Text>
          <Switch value={isDarkTheme} onValueChange={setIsDarkTheme} />
        </View>

        <Pressable
          onPress={resetProgress}
          style={{
            backgroundColor: colors.danger,
            paddingVertical: 14,
            borderRadius: 14,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 16,
              fontWeight: "700",
            }}
          >
            Скинути прогрес
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
