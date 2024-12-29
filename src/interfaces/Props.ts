import type { StyleProp, ViewStyle } from 'react-native';

export interface BottomSheetProps {
  style?: StyleProp<ViewStyle>;
  height?: number | `${number}%`;
  maxHeight?: number;
  alwaysTop?: boolean;
  followKeyboard?: boolean;
  useKeyboardController?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}
