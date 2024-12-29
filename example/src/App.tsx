import { useRef, useState } from 'react';
import { View, StyleSheet, StatusBar, Keyboard } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider, Button, Divider, TextInput } from 'react-native-paper';
import { type BottomSheetRef } from 'react-native-paper-bottom-sheet';
import NormalBottomSheet from './components/NormalBottomSheet';
import ValueBottomSheet from './components/ValueBottomSheet';
import ValueMaxBottomSheet from './components/ValueMaxBottomSheet';
import InputBottomSheet from './components/InputBottomSheet';

export default function App() {
  const [valueDp, setValueDp] = useState('300');

  const [valueDp2, setValueDp2] = useState('50%');
  const [valueDp2Max, setValueDp2Max] = useState('500');

  const refBottomSheetNormal = useRef<BottomSheetRef>(null);
  const refBottomSheetValue = useRef<BottomSheetRef>(null);
  const refBottomSheetValueMax = useRef<BottomSheetRef>(null);
  const refBottomSheetInput = useRef<BottomSheetRef>(null);

  return (
    <PaperProvider>
      <GestureHandlerRootView style={styles.container}>
        <StatusBar />
        <View style={styles.principalContent}>
          <Button
            mode={'contained'}
            onPress={() => refBottomSheetNormal.current?.expand()}
          >
            Abrir normal
          </Button>

          <Divider style={styles.divider} />

          <TextInput
            mode={'flat'}
            value={valueDp}
            label={'Valor en dp'}
            keyboardType={'number-pad'}
            onChangeText={setValueDp}
          />
          <Button
            mode={'contained'}
            style={styles.marginTop}
            onPress={() => {
              refBottomSheetValue.current?.expand();
              Keyboard.dismiss();
            }}
          >
            Abrir
          </Button>

          <Divider style={styles.divider} />

          <TextInput
            mode={'flat'}
            value={valueDp2}
            label={'Valor en dp'}
            onChangeText={setValueDp2}
          />
          <TextInput
            mode={'flat'}
            value={valueDp2Max}
            style={styles.marginTop}
            label={'Valor maximo en dp o porcentaje'}
            keyboardType={'number-pad'}
            onChangeText={setValueDp2Max}
          />
          <Button
            mode={'contained'}
            style={styles.marginTop}
            onPress={() => {
              refBottomSheetValueMax.current?.expand();
              Keyboard.dismiss();
            }}
          >
            Abrir
          </Button>

          <Divider style={styles.divider} />

          <Button
            mode={'contained'}
            onPress={() => refBottomSheetInput.current?.expand()}
          >
            Abrir con entrada de texto
          </Button>
        </View>

        <NormalBottomSheet ref={refBottomSheetNormal} />
        <ValueBottomSheet ref={refBottomSheetValue} value={valueDp} />
        <ValueMaxBottomSheet
          ref={refBottomSheetValueMax}
          value={valueDp2}
          valueMax={valueDp2Max}
        />
        <InputBottomSheet ref={refBottomSheetInput} />
      </GestureHandlerRootView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  principalContent: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 12,
  },
  divider: {
    marginVertical: 30,
  },
  marginTop: {
    marginTop: 12,
  },
});
