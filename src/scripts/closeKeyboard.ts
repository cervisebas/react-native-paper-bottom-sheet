import { Keyboard } from 'react-native';

export default function () {
  if (Keyboard.isVisible()) {
    Keyboard.dismiss();
  }
}
