import { Pressable, Switch } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  padding: 20px;
  justify-content: center;
  background-color: ${({ $colors }) => $colors.background};
`;

const Card = styled.View`
  background-color: ${({ $colors }) => $colors.card};
  border-radius: 20px;
  padding: 20px;
  border-width: 1px;
  border-color: ${({ $colors }) => $colors.border};
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: 700;
  color: ${({ $colors }) => $colors.text};
  margin-bottom: 20px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Label = styled.Text`
  font-size: 16px;
  color: ${({ $colors }) => $colors.text};
`;

const ResetButton = styled(Pressable)`
  background-color: ${({ $colors }) => $colors.danger};
  padding: 14px 0;
  border-radius: 14px;
  align-items: center;
`;

const ResetButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
`;

export default function SettingsScreen({
  isDarkTheme,
  setIsDarkTheme,
  resetProgress,
  colors,
}) {
  return (
    <Container $colors={colors}>
      <Card $colors={colors}>
        <Title $colors={colors}>Налаштування</Title>

        <Row>
          <Label $colors={colors}>Темна тема</Label>
          <Switch value={isDarkTheme} onValueChange={setIsDarkTheme} />
        </Row>

        <ResetButton $colors={colors} onPress={resetProgress}>
          <ResetButtonText>Скинути прогрес</ResetButtonText>
        </ResetButton>
      </Card>
    </Container>
  );
}
