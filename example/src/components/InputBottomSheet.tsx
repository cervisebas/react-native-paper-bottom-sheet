import type React from 'react';
import { forwardRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';
import BottomSheet, {
  type BottomSheetRef,
} from 'react-native-paper-bottom-sheet';

export default forwardRef(function (_: {}, ref: React.Ref<BottomSheetRef>) {
  const [value, setValue] = useState('');

  return (
    <BottomSheet ref={ref}>
      <View style={styles.contentBottomSheet}>
        <TextInput
          mode={'outlined'}
          label={'Write here'}
          value={value}
          onChangeText={setValue}
        />
        <HelperText visible type={'error'}>
          Try this in a React Native project, not an Expo project.
        </HelperText>
      </View>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  contentBottomSheet: {
    height: 180,
    paddingHorizontal: 16,
  },
});
