import { Text, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import Layout from '@/components/Layout';
import SaleCard from '@/components/cards/SaleCard';
import Pagination from '@/components/Pagination';
import { useEffect, useState } from 'react';
import { useSaleStore } from "../../../../packages/shared/stores/useSaleStore"
import GhostButton from '@/components/GhostButton';
import Button from '@/components/Button';
import SheetModal from '@/components/SheetModal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;

export default function SalesScreen() {
  const { getSales, sales } = useSaleStore()
  const [pageNumber, setPageNumber] = useState(1)
  const [bottomSheetIndex, setBottomSheetIndex] = useState(-1)

  useEffect(() => {
    if (pageNumber) {
      getSales(pageNumber)
    }
  }, [pageNumber])

  const openBottomSheet = () => {
    setBottomSheetIndex(1)
  }

  return (
    <GestureHandlerRootView>
      <Layout>
        <Text>Sales</Text>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <GhostButton label='Filtrele' onPress={openBottomSheet} />
          </View>
          <View style={styles.button}>
            <Button label='Satış Ekle' onPress={openBottomSheet} />
          </View>
        </View>
        <View style={styles.cardContainer}>
          {
            sales?.map(((sale, index) => (
              <TouchableOpacity onPress={openBottomSheet} key={index}>
                <SaleCard sale={sale} />
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