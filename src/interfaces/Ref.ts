export interface BottomSheetRef {
  expand: () => void;
  close: () => void;
  isActive: () => boolean;
}
