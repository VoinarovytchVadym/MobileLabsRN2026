import { View, Text } from "react-native";

export default function TasksScreen({
  count,
  tapCount,
  doubleTapCount,
  longPressCount,
  swipeLeftCount,
  swipeRightCount,
  dragCount,
  pinchCount,
  colors,
}) {
  const tasks = [
    {
      title: "Зробити 10 кліків",
      description: "Натиснути на об'єкт 10 разів.",
      done: tapCount >= 10,
      progress: `${tapCount}/10`,
    },
    {
      title: "Зробити подвійний клік 5 разів",
      description:
        "Використати TapGestureHandler для виконання 5 подвійних кліків.",
      done: doubleTapCount >= 5,
      progress: `${doubleTapCount}/5`,
    },
    {
      title: "Утримувати об'єкт 3 секунди",
      description:
        "Використати LongPressGestureHandler для довгого натискання.",
      done: longPressCount >= 1,
      progress: `${longPressCount}/1`,
    },
    {
      title: "Перетягнути об'єкт",
      description:
        "Використати PanGestureHandler, щоб перемістити об'єкт по екрану.",
      done: dragCount >= 1,
      progress: `${dragCount}/1`,
    },
    {
      title: "Зробити свайп вправо",
      description:
        "Використати FlingGestureHandler, щоб зробити швидкий свайп вправо.",
      done: swipeRightCount >= 1,
      progress: `${swipeRightCount}/1`,
    },
    {
      title: "Зробити свайп вліво",
      description:
        "Використати FlingGestureHandler, щоб зробити швидкий свайп вліво.",
      done: swipeLeftCount >= 1,
      progress: `${swipeLeftCount}/1`,
    },
    {
      title: "Змінити розмір об'єкта",
      description:
        "Використати PinchGestureHandler, щоб збільшити або зменшити об'єкт.",
      done: pinchCount >= 1,
      progress: `${pinchCount}/1`,
    },
    {
      title: "Отримати 100 очок",
      description: "Набрати загалом 100 очок у лічильнику.",
      done: count >= 100,
      progress: `${count}/100`,
    },
    {
      title: "Додаткове завдання",
      description: "Набрати 20 очок.",
      done: count >= 20,
      progress: `${count}/20`,
    },
  ];

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: colors.background,
      }}
    >
      {tasks.map((task, index) => (
        <View
          key={index}
          style={{
            backgroundColor: colors.card,
            borderRadius: 16,
            padding: 14,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: 16,
              fontWeight: "700",
              marginBottom: 6,
            }}
          >
            {task.done ? "✅" : "❌"} {task.title}
          </Text>

          <Text
            style={{
              color: colors.secondaryText,
              marginBottom: 6,
            }}
          >
            {task.description}
          </Text>

          <Text
            style={{
              color: colors.text,
              fontWeight: "600",
            }}
          >
            Прогрес: {task.progress}
          </Text>
        </View>
      ))}
    </View>
  );
}
