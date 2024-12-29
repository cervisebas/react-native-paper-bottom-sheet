import type React from 'react';
import { forwardRef } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Paragraph } from 'react-native-paper';
import BottomSheet, {
  type BottomSheetRef,
} from 'react-native-paper-bottom-sheet';

export default forwardRef(function (_: {}, ref: React.Ref<BottomSheetRef>) {
  return (
    <BottomSheet ref={ref} height={'50%'}>
      <ScrollView style={styles.scrollview}>
        <Paragraph>
          Lorem ipsum odor amet, consectetuer adipiscing elit. Justo himenaeos
          sodales nisi penatibus aliquam lorem. Malesuada ante vestibulum tempus
          id phasellus fermentum erat consectetur. Vehicula dignissim per tellus
          natoque, porta dolor nostra nisi egestas. Massa efficitur lectus
          cursus penatibus pulvinar ornare nam elementum. Feugiat porttitor dui
          tellus elit nulla vel dictum eget. Fames non est venenatis cursus
          pretium auctor vestibulum. Fames pulvinar augue aptent placerat
          interdum. Suscipit nisi proin lectus; augue amet fermentum commodo.
          Facilisi mi consequat consequat convallis tincidunt. Finibus conubia
          ornare diam bibendum viverra libero orci. Elementum dui laoreet
          placerat feugiat natoque maecenas. Euismod at semper lacus sapien nibh
          suspendisse nascetur commodo. Diam erat nibh id dignissim suspendisse!
          Dis arcu tincidunt vulputate sollicitudin neque litora torquent! Eu
          pretium scelerisque sapien porta condimentum senectus imperdiet
          ultricies lectus. Maecenas habitant maximus accumsan purus posuere
          vulputate. Cubilia sed nam leo urna consectetur conubia porttitor. Id
          aliquet laoreet massa turpis curabitur enim sit justo vitae. Dictumst
          orci natoque non primis netus ornare. Dolor cras maecenas venenatis
          etiam vehicula sollicitudin ligula montes. Facilisi vehicula ultrices
          enim magnis magna, primis luctus? Cubilia lacus sagittis semper turpis
          parturient ac aliquet? Risus cras praesent ornare platea senectus
          nibh. Porttitor euismod parturient class massa torquent montes.
          Fermentum tempor montes elit blandit in sapien eu habitasse phasellus.
          Efficitur sollicitudin viverra sagittis et; curae cubilia tellus
          natoque. Aliquet id nulla bibendum efficitur ante nostra senectus.
          Pretium viverra penatibus dui netus; nullam vehicula lectus duis
          himenaeos. Placerat habitant maecenas ridiculus nisi nisi commodo
          suscipit. Ipsum curabitur elit vehicula donec in justo euismod. Lorem
          aliquam ridiculus ornare viverra himenaeos in et class. Magna est
          pharetra efficitur a eros tempor. Aliquam curae sociosqu leo placerat
          mattis. Malesuada nulla in sit sollicitudin phasellus gravida
          senectus. Ullamcorper platea est mi vel malesuada. Montes vitae
          faucibus quis ac penatibus orci vulputate donec ipsum. Dolor lectus
          malesuada pellentesque amet placerat. Convallis iaculis tempus et
          fermentum donec. Ac imperdiet gravida ullamcorper ut sodales.
        </Paragraph>
      </ScrollView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  scrollview: {
    flex: 1,
    paddingHorizontal: 12,
  },
});
