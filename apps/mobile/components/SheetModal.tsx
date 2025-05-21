import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useMemo, useRef } from "react";
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
  const bottomSheetRef = useRef<BottomSheetModal>(null)

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        onPress={() => setIndex(-1)}
        {...props}
      />
    ),
    []
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (index !== -1) {
        bottomSheetRef.current?.present()
      }
    }, 100)

    return () => {
      clearTimeout(timer)
      bottomSheetRef.current?.dismiss()
    }
  }, [index])

  useEffect(() => {
    if (index !== -1) {
      bottomSheetRef.current?.present()
    } else {
      bottomSheetRef.current?.dismiss()
    }
  }, [index])

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={index}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      onDismiss={() => setIndex(-1)}
      onChange={(sheetIndex) => {
        if (sheetIndex === -1) {
          setIndex(-1)
        }
      }}
    >
      <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
        {children}
      </BottomSheetScrollView>
    </BottomSheetModal>
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