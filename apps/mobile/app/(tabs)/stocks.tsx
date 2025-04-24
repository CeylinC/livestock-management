import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Layout from '@/components/Layout';
import StockCard from '@/components/cards/StockCard';
import { useEffect, useState } from 'react';
import { useStockStore } from "../../../../packages/shared/stores/useStockStore"
import Pagination from '@/components/Pagination';
import GhostButton from '@/components/GhostButton';
import Button from '@/components/Button';
import SheetModal from '@/components/SheetModal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;

export default function StocksScreen() {
  const { getStocks, stocks } = useStockStore()
  const [pageNumber, setPageNumber] = useState(1)
  const [bottomSheetIndex, setBottomSheetIndex] = useState(-1)

  useEffect(() => {
    if (pageNumber) {
      getStocks(pageNumber)
    }
  }, [pageNumber])

  const openBottomSheet = () => {
    setBottomSheetIndex(1)
  }

  return (
    <GestureHandlerRootView>
      <Layout>
        <Text>Stocks</Text>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <GhostButton label='Filtrele' onPress={openBottomSheet} />
          </View>
          <View style={styles.button}>
            <Button label='Stock Ekle' onPress={openBottomSheet} />
          </View>
        </View>
        <View style={styles.cardContainer}>
          {
            stocks?.map(((stock, index) => (
              <TouchableOpacity onPress={openBottomSheet} key={index}>
                <StockCard stock={stock} key={index} />
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