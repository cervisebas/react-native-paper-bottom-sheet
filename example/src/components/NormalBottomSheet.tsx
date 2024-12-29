import type React from 'react';
import { forwardRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import BottomSheet, {
  type BottomSheetRef,
} from 'react-native-paper-bottom-sheet';

export default forwardRef(function (_: {}, ref: React.Ref<BottomSheetRef>) {
  return (
    <BottomSheet ref={ref}>
      <View style={styles.contentBottomSheet}>
        <Text>Hello</Text>
      </View>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  contentBottomSheet: {
    height: 180,
  },
});
