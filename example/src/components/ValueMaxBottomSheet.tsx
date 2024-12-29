import type React from 'react';
import { forwardRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import BottomSheet, {
  type BottomSheetRef,
} from 'react-native-paper-bottom-sheet';

interface IProps {
  value: string;
  valueMax: string;
}

export default forwardRef(function (
  props: IProps,
  ref: React.Ref<BottomSheetRef>
) {
  return (
    <BottomSheet
      ref={ref}
      height={props.value as any}
      maxHeight={Number(props.valueMax)}
    >
      <View style={styles.contentBottomSheet}>
        <Text>Hello world!!</Text>
      </View>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  contentBottomSheet: {
    height: 180,
  },
});
