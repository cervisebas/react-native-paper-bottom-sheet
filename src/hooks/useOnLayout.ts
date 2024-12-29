import { useCallback } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

export default function (callbak: (val: number) => void, deps: any[]) {
  const actualLayout = useSharedValue(0);

  const onLayout = useCallback(
    ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
      if (actualLayout.value === layout.height) return;
      actualLayout.value = layout.height;

      callbak(layout.height);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps
  );

  return { onLayout };
}
