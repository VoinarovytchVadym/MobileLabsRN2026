import { View, Text, Animated } from "react-native";
import { useRef, useState } from "react";
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
    <GestureHandlerRootView style={{ flex: 1 }}>
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
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 20,
                    backgroundColor: colors.background,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      backgroundColor: colors.card,
                      borderRadius: 20,
                      padding: 20,
                      borderWidth: 1,
                      borderColor: colors.border,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 30,
                        fontWeight: "700",
                        color: colors.text,
                        marginBottom: 12,
                      }}
                    >
                      Очки: {count}
                    </Text>

                    <Text style={{ color: colors.secondaryText }}>
                      Tap: {tapCount}
                    </Text>
                    <Text style={{ color: colors.secondaryText }}>
                      Double tap: {doubleTapCount}
                    </Text>
                    <Text style={{ color: colors.secondaryText }}>
                      Long press: {longPressCount}
                    </Text>
                    <Text style={{ color: colors.secondaryText }}>
                      Swipe left: {swipeLeftCount}
                    </Text>
                    <Text style={{ color: colors.secondaryText }}>
                      Swipe right: {swipeRightCount}
                    </Text>
                    <Text style={{ color: colors.secondaryText }}>
                      Drag: {dragCount}
                    </Text>
                    <Text style={{ color: colors.secondaryText }}>
                      Pinch: {pinchCount}
                    </Text>

                    <Text
                      style={{
                        color: colors.secondaryText,
                        marginTop: 10,
                      }}
                    >
                      Останній свайп: +{lastSwipePoints}
                    </Text>
                    <Text
                      style={{
                        color: colors.secondaryText,
                        marginBottom: 24,
                      }}
                    >
                      Останній pinch бонус: +{lastPinchBonus}
                    </Text>

                    <PanGestureHandler
                      onGestureEvent={onPanGestureEvent}
                      onHandlerStateChange={onPanHandlerStateChange}
                    >
                      <PinchGestureHandler
                        onGestureEvent={onPinchEvent}
                        onHandlerStateChange={onPinchStateChange}
                      >
                        <Animated.View
                          style={{
                            width: 140,
                            height: 140,
                            borderRadius: 70,
                            backgroundColor: colors.circle,
                            justifyContent: "center",
                            alignItems: "center",
                            transform: [
                              { translateX: translateX },
                              { translateY: translateY },
                              { scale: scale },
                            ],
                          }}
                        >
                          <Text
                            style={{
                              color: "#FFFFFF",
                              fontSize: 18,
                              fontWeight: "600",
                            }}
                          >
                            Drag me
                          </Text>
                        </Animated.View>
                      </PinchGestureHandler>
                    </PanGestureHandler>
                  </View>
                </View>
              </FlingGestureHandler>
            </FlingGestureHandler>
          </TapGestureHandler>
        </TapGestureHandler>
      </LongPressGestureHandler>
    </GestureHandlerRootView>
  );
}
