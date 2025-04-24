import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useCallback, useMemo } from "react";
import { Modal, StyleSheet } from 'react-native';

export default function SheetModal({
  index = -1,
  setIndex,
  children,
}: {
  index: number
  setIndex: (value: number) => void
  children: React.JSX.Element
}) {
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        onPress={() => setIndex(-1)}
        {...props}
      />
    ),
    []
  );

  return (
    <Modal transparent visible={index >= 0}>
      <BottomSheet
        index={index}
        snapPoints={snapPoints}
        enableDynamicSizing={true}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          {children}
        </BottomSheetScrollView>
      </BottomSheet>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
  },
  contentContainer: {
    backgroundColor: "white",
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
  },
});