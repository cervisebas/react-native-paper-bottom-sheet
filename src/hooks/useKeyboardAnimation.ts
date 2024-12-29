import { useSharedValue } from 'react-native-reanimated';

let KController: any;
try {
  KController = require('react-native-keyboard-controller');
} catch (error) {
  KController = null;
}

export default function (use: boolean) {
  if (use) {
    if (!KController) {
      throw 'The library "react-native-keyboard-controller" is not installed';
    }

    const { height, progress } = KController.useReanimatedKeyboardAnimation();

    return {
      heightKeyboard: height,
      progressKeyboard: progress,
    };
  }

  const height = useSharedValue(0);
  const progress = useSharedValue(0);

  return {
    heightKeyboard: height,
    progressKeyboard: progress,
  };
}
