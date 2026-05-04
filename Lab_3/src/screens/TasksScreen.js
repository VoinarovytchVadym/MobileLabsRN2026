import styled from "styled-components/native";

const Container = styled.ScrollView`
  flex: 1;
  padding: 20px;
  background-color: ${({ $colors }) => $colors.background};
`;

const TaskCard = styled.View`
  background-color: ${({ $colors }) => $colors.card};
  border-radius: 16px;
  padding: 14px;
  margin-bottom: 12px;
  border-width: 1px;
  border-color: ${({ $colors }) => $colors.border};
`;

const TaskTitle = styled.Text`
  color: ${({ $colors }) => $colors.text};
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 6px;
`;

const TaskDescription = styled.Text`
  color: ${({ $colors }) => $colors.secondaryText};
  margin-bottom: 6px;
`;

const TaskProgress = styled.Text`
  color: ${({ $colors }) => $colors.text};
  font-weight: 600;
`;

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
    <Container $colors={colors}>
      {tasks.map((task, index) => (
        <TaskCard key={index} $colors={colors}>
          <TaskTitle $colors={colors}>
            {task.done ? "✅" : "❌"} {task.title}
          </TaskTitle>

          <TaskDescription $colors={colors}>{task.description}</TaskDescription>

          <TaskProgress $colors={colors}>Прогрес: {task.progress}</TaskProgress>
        </TaskCard>
      ))}
    </Container>
  );
}
