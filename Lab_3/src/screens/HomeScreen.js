import { Animated } from "react-native";
import { useRef, useState } from "react";
import styled from "styled-components/native";
import {
  GestureHandlerRootView,
  TapGestureHandler,
  LongPressGestureHandler,
  PanGestureHandler,
  FlingGestureHandler,
  PinchGestureHandler,
  Directions,
  State,
} from "react-native-gesture-handler";

const Root = styled(GestureHandlerRootView)`
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: ${({ $colors }) => $colors.background};
`;

const Card = styled.View`
  width: 100%;
  background-color: ${({ $colors }) => $colors.card};
  border-radius: 20px;
  padding: 20px;
  border-width: 1px;
  border-color: ${({ $colors }) => $colors.border};
  align-items: center;
`;

const ScoreText = styled.Text`
  font-size: 30px;
  font-weight: 700;
  color: ${({ $colors }) => $colors.text};
  margin-bottom: 12px;
`;

const StatText = styled.Text`
  color: ${({ $colors }) => $colors.secondaryText};
`;

const LastSwipeText = styled(StatText)`
  margin-top: 10px;
`;

const LastPinchText = styled(StatText)`
  margin-bottom: 24px;
`;

const Circle = styled(Animated.View)`
  width: 140px;
  height: 140px;
  border-radius: 70px;
  background-color: ${({ $colors }) => $colors.circle};
  justify-content: center;
  align-items: center;
`;

const CircleText = styled.Text`
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
`;

export default function HomeScreen({
  count,
  setCount,
  tapCount,
  setTapCount,
  doubleTapCount,
  setDoubleTapCount,
  longPressCount,
  setLongPressCount,
  swipeLeftCount,
  setSwipeLeftCount,
  swipeRightCount,
  setSwipeRightCount,
  dragCount,
  setDragCount,
  pinchCount,
  setPinchCount,
  colors,
}) {
  const doubleTapRef = useRef(null);
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const lastOffsetX = useRef(0);
  const lastOffsetY = useRef(0);
  const [lastSwipePoints, setLastSwipePoints] = useState(0);
  const [lastPinchBonus, setLastPinchBonus] = useState(0);

  const getRandomSwipePoints = () => Math.floor(Math.random() * 10) + 1;

  const handleSingleTap = () => {
    setCount((prev) => prev + 1);
    setTapCount((prev) => prev + 1);
  };

  const handleDoubleTap = () => {
    setCount((prev) => prev + 2);
    setDoubleTapCount((prev) => prev + 1);
  };

  const handleLongPress = () => {
    setCount((prev) => prev + 5);
    setLongPressCount((prev) => prev + 1);
  };

  const handleSwipeRight = () => {
    const points = getRandomSwipePoints();
    setCount((prev) => prev + points);
    setSwipeRightCount((prev) => prev + 1);
    setLastSwipePoints(points);
  };

  const handleSwipeLeft = () => {
    const points = getRandomSwipePoints();
    setCount((prev) => prev + points);
    setSwipeLeftCount((prev) => prev + 1);
    setLastSwipePoints(points);
  };

  const onPanGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translateX,
          translationY: translateY,
        },
      },
    ],
    { useNativeDriver: false },
  );

  const onPanHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      lastOffsetX.current += event.nativeEvent.translationX;
      lastOffsetY.current += event.nativeEvent.translationY;
      translateX.setOffset(lastOffsetX.current);
      translateX.setValue(0);
      translateY.setOffset(lastOffsetY.current);
      translateY.setValue(0);
      setDragCount(1);
    }
  };

  const onPinchEvent = Animated.event([{ nativeEvent: { scale } }], {
    useNativeDriver: false,
  });

  const onPinchStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const currentScale = event.nativeEvent.scale;
      let bonus = 0;

      if (currentScale > 1.1) {
        bonus = 4;
      } else if (currentScale < 0.9) {
        bonus = 2;
      }

      if (bonus > 0) {
        setCount((prev) => prev + bonus);
        setLastPinchBonus(bonus);
      }

      setPinchCount(1);
      scale.setValue(1);
    }
  };

  return (
    <Root>
      <LongPressGestureHandler
        minDurationMs={3000}
        onActivated={handleLongPress}
      >
        <TapGestureHandler waitFor={doubleTapRef} onActivated={handleSingleTap}>
          <TapGestureHandler
            ref={doubleTapRef}
            numberOfTaps={2}
            onActivated={handleDoubleTap}
          >
            <FlingGestureHandler
              direction={Directions.LEFT}
              onActivated={handleSwipeLeft}
            >
              <FlingGestureHandler
                direction={Directions.RIGHT}
                onActivated={handleSwipeRight}
              >
                <Container $colors={colors}>
                  <Card $colors={colors}>
                    <ScoreText $colors={colors}>Очки: {count}</ScoreText>

                    <StatText $colors={colors}>Tap: {tapCount}</StatText>
                    <StatText $colors={colors}>
                      Double tap: {doubleTapCount}
                    </StatText>
                    <StatText $colors={colors}>
                      Long press: {longPressCount}
                    </StatText>
                    <StatText $colors={colors}>
                      Swipe left: {swipeLeftCount}
                    </StatText>
                    <StatText $colors={colors}>
                      Swipe right: {swipeRightCount}
                    </StatText>
                    <StatText $colors={colors}>Drag: {dragCount}</StatText>
                    <StatText $colors={colors}>Pinch: {pinchCount}</StatText>

                    <LastSwipeText $colors={colors}>
                      Останній свайп: +{lastSwipePoints}
                    </LastSwipeText>

                    <LastPinchText $colors={colors}>
                      Останній pinch бонус: +{lastPinchBonus}
                    </LastPinchText>

                    <PanGestureHandler
                      onGestureEvent={onPanGestureEvent}
                      onHandlerStateChange={onPanHandlerStateChange}
                    >
                      <PinchGestureHandler
                        onGestureEvent={onPinchEvent}
                        onHandlerStateChange={onPinchStateChange}
                      >
                        <Circle
                          $colors={colors}
                          style={{
                            transform: [
                              { translateX },
                              { translateY },
                              { scale },
                            ],
                          }}
                        >
                          <CircleText>Drag me</CircleText>
                        </Circle>
                      </PinchGestureHandler>
                    </PanGestureHandler>
                  </Card>
                </Container>
              </FlingGestureHandler>
            </FlingGestureHandler>
          </TapGestureHandler>
        </TapGestureHandler>
      </LongPressGestureHandler>
    </Root>
  );
}
