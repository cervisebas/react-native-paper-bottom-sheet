import React, { useEffect, useState } from 'react';
import { forwardRef, useCallback, useImperativeHandle } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useTheme } from 'react-native-paper';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import type { BottomSheetProps } from './interfaces/Props';
import type { BottomSheetRef } from './interfaces/Ref';
import toPercent from './scripts/toPercent';
import useOnLayout from './hooks/useOnLayout';
import useKeyboardAnimation from './hooks/useKeyboardAnimation';
import closeKeyboard from './scripts/closeKeyboard';
import useSafeArea from './hooks/useSafeArea';
import useDimension from './hooks/useDimension';
import usePreventBackHandler from './hooks/usePreventBackHandler';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const ALWAYS_TOP = 999999;

const BottomSheet = React.memo(
  forwardRef(function BottomSheet(
    props: BottomSheetProps,
    ref: React.Ref<BottomSheetRef>
  ) {
    const theme = useTheme();
    const [visible, setVisible] = useState(false);
    const { horizontal, bottom, top } = useSafeArea();
    const [WINDOW_WIDTH, WINDOW_HEIGHT] = useDimension('window');
    const { heightKeyboard, progressKeyboard } = useKeyboardAnimation(
      props.useKeyboardController ?? false
    );

    const translateY = useSharedValue(0);
    const active = useSharedValue(0);
    const opacity = useSharedValue(0);
    const followKeyboard = useSharedValue(false);

    const heightLayout = useSharedValue(0);

    const onClose = () => props.onClose?.();

    const scrollTo = useCallback(
      (destination: number) => {
        'worklet';
        active.value = Number(destination !== 0);

        if (destination === 0) {
          runOnJS(onClose)();
          runOnJS(setVisible)(false);
          runOnJS(closeKeyboard)();
          opacity.value = withDelay(350, withTiming(0));
        } else {
          runOnJS(setVisible)(true);
          opacity.value = 1;
        }

        translateY.value = withTiming(-destination, { duration: 350 });
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [onClose]
    );

    const isActive = useCallback(() => {
      return Boolean(active.value);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { onLayout } = useOnLayout(
      (layout) => {
        if (props.height) {
          if (typeof props.height === 'string') {
            let value = WINDOW_HEIGHT * toPercent(props.height);
            if (props.maxHeight) {
              value = Math.min(value, props.maxHeight);
            }

            heightLayout.value = value;
            if (isActive()) {
              scrollTo(value);
            }
          } else {
            let value = props.height;
            if (props.maxHeight) {
              value = Math.min(value, props.maxHeight);
            }

            heightLayout.value = value;
            if (isActive()) {
              scrollTo(value);
            }
          }
        } else {
          heightLayout.value = layout;
          if (isActive()) {
            if (props.maxHeight) {
              scrollTo(Math.min(layout, props.maxHeight));
            } else {
              scrollTo(layout);
            }
          }
        }
      },
      [props, WINDOW_HEIGHT]
    );

    const context = useSharedValue({ y: 0 });
    const gesture = Gesture.Pan()
      .runOnJS(true)
      .onStart(() => {
        context.value = { y: translateY.value };
      })
      .onUpdate((event) => {
        translateY.value = event.translationY + context.value.y;
        translateY.value = Math.max(translateY.value, -heightLayout.value);
      })
      .onEnd(() => {
        const HEIGHT = heightLayout.value;
        if (translateY.value > -HEIGHT / 2.5) {
          runOnJS(scrollTo)(0);
        } else {
          runOnJS(scrollTo)(HEIGHT);
        }
      });

    const bottomSheetStyle = useAnimatedStyle(() => {
      const _translateY = followKeyboard.value
        ? translateY.value + (visible ? heightKeyboard.value : 0)
        : translateY.value;
      return {
        opacity: opacity.value,
        paddingBottom: interpolate(
          visible ? progressKeyboard.value : 0,
          [0, 1],
          [bottom, 0]
        ),
        transform: [{ translateY: _translateY }],
      };
    }, [bottom, visible]);

    const backdropStyle = useAnimatedStyle(() => {
      return {
        display: active.value ? 'flex' : 'none',
        opacity: withTiming(active.value, { duration: 300 }),
      };
    });

    usePreventBackHandler(() => {
      scrollTo(0);
    }, visible);

    useEffect(() => {
      followKeyboard.value = props.followKeyboard ?? true;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
      followKeyboard.value = props.followKeyboard ?? true;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.followKeyboard]);

    useImperativeHandle(ref, () => ({
      isActive: isActive,
      expand: () => {
        'worklet';
        scrollTo(heightLayout.value);
      },
      close: () => {
        scrollTo(0);
      },
    }));

    return (
      <React.Fragment>
        <AnimatedPressable
          style={[
            props.style,
            styles.backdrop,
            backdropStyle,
            {
              backgroundColor: theme.colors.backdrop,
            },
            props.alwaysTop
              ? {
                  zIndex: ALWAYS_TOP - 1,
                }
              : {},
          ]}
          onPress={() => scrollTo(0)}
        />
        <GestureDetector gesture={gesture}>
          <Animated.ScrollView
            style={[
              styles.bottomSheetContainer,
              bottomSheetStyle,
              {
                top: WINDOW_HEIGHT + top + bottom,
                width: WINDOW_WIDTH - horizontal,
                height: props.height,
                maxHeight: props.maxHeight,
                paddingBottom: bottom,
                backgroundColor: theme.colors.elevation.level2,
              },
              props.alwaysTop
                ? {
                    zIndex: ALWAYS_TOP,
                  }
                : {},
            ]}
            onLayout={onLayout}
          >
            <View
              style={[
                styles.line,
                {
                  backgroundColor: theme.colors.onBackground,
                },
              ]}
            />
            {props.children}
          </Animated.ScrollView>
        </GestureDetector>
      </React.Fragment>
    );
  })
);

export default BottomSheet;
export type { BottomSheetProps, BottomSheetRef };

const styles = StyleSheet.create({
  bottomSheetContainer: {
    width: '100%',
    position: 'absolute',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    elevation: 24,
  },
  line: {
    width: 32,
    height: 4,
    alignSelf: 'center',
    marginVertical: 16,
    borderRadius: 2,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
});
