# react-native-paper-bottom-sheet

Bottom sheet panel created with themes from react-native-paper, using react-native-reanimated and react-native-gesture-handler.

The library is compatible with react-native-keyboard-controller for text inputs.

## Installation

```sh
yarn add react-native-paper-bottom-sheet
```

## Dependencies

```sh
yarn add react-native-gesture-handler react-native-paper react-native-reanimated
```

## Optional

```sh
yarn add react-native-keyboard-controller
```

## Example


```js
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider, Button } from 'react-native-paper';
import BottomSheet, {
  type BottomSheetRef,
} from 'react-native-paper-bottom-sheet';

export default function App() {
    const refBottomSheet = useRef<BottomSheetRef>(null);

    return (
        <PaperProvider>
            <GestureHandlerRootView style={styles.container}>
                <Button
                    mode={'contained'}
                    onPress={() => {
                        refBottomSheet.current?.expand();
                    }}
                >
                    Open
                </Button>

                <BottomSheet ref={refBottomSheet}>
                    <Text>Hello world!!!</Text>
                </BottomSheet>
            </GestureHandlerRootView>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
```

## Example with `react-native-keyboard-controller`


```js
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider, Button, TextInput } from 'react-native-paper';
import BottomSheet, {
  type BottomSheetRef,
} from 'react-native-paper-bottom-sheet';
import {KeyboardProvider} from 'react-native-keyboard-controller';

export default function App() {
    const [value, setValue] = useState('');
    const refBottomSheet = useRef<BottomSheetRef>(null);

    return (
        <PaperProvider>
            <KeyboardProvider>
                <GestureHandlerRootView style={styles.container}>
                    <Button
                        mode={'contained'}
                        onPress={() => {
                            refBottomSheet.current?.expand();
                        }}
                    >
                        Open
                    </Button>

                    <BottomSheet ref={refBottomSheet} useKeyboardController>
                        <TextInput
                            mode={'outlined'}
                            label={'Write here'}
                            value={value}
                            onChangeText={setValue}
                        />
                    </BottomSheet>
                </GestureHandlerRootView>
            </KeyboardProvider>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
```

## Properties

| Prop                       | Required | Type                    | Description                                                                |
| -------------------------- | -------- | ----------------------- | -------------------------------------------------------------------------- |
| **style**                  | NO       | `StyleProp<ViewStyle>`  | Styles for the bottom sheet container.                                     |
| **height**                 | NO       | `number` or percent     | Height of the container.                                                   |
| **maxHeight**              | NO       | `number`                | Maximum height of the container.                                           |
| **alwaysTop**              | NO       | `boolean`               | Sets whether the bottom sheet should always remain on top.                 |
| **followKeyboard**         | NO       | `boolean`               | Sets whether the container should follow the keyboard when it opens.       |
| **useKeyboardController**  | NO       | `boolean`               | Specifies that the react-native-keyboard-controller library will be used.  |
| **onClose**                | NO       | `Function`              | Function triggered when the bottom sheet is closed.                        |
| **children**               | YES      | `ReactNode`             | Component to be displayed inside the container.                            |


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
