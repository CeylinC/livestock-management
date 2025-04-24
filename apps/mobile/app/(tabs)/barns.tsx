import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Layout from '@/components/Layout';
import BarnCard from '@/components/cards/BarnCard';
import { useEffect, useState } from 'react';
import { useBarnStore } from "../../../../packages/shared/stores/useBarnStore"
import Pagination from '@/components/Pagination';
import GhostButton from '@/components/GhostButton';
import Button from '@/components/Button';
import SheetModal from '@/components/SheetModal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;

export default function BarnsScreen() {
  const { getBarns, barns } = useBarnStore()
  const [pageNumber, setPageNumber] = useState(1)
  const [bottomSheetIndex, setBottomSheetIndex] = useState(-1)

  useEffect(() => {
    if (pageNumber) {
      getBarns(pageNumber)
    }
  }, [pageNumber])

  const openBottomSheet = () => {
    setBottomSheetIndex(1)
  }

  return (
    <GestureHandlerRootView>
      <Layout>
        <Text>Barns</Text>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <GhostButton label='Filtrele' onPress={openBottomSheet} />
          </View>
          <View style={styles.button}>
            <Button label='Ağıl Ekle' onPress={openBottomSheet} />
          </View>
        </View>
        <View style={styles.cardContainer}>
          {
            barns?.map(((barn, index) => (
              <TouchableOpacity onPress={openBottomSheet} key={index}>
                <BarnCard barn={barn} />
              </TouchableOpacity>
            )))
          }
          <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} totalPages={5} />
        </View>
      </Layout>
      <SheetModal index={bottomSheetIndex} setIndex={setBottomSheetIndex}>
        <Text>Deneme</Text>
      </SheetModal>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 8
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    marginVertical: 8
  },
  button: {
    width: windowWidth / 2 - 20,
  }
})