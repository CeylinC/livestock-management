import { Text, View, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import Layout from '@/components/Layout';
import StockCard from '@/components/cards/StockCard';
import { useEffect, useState } from 'react';
import { useStockStore } from "@/stores/useStockStore"
import Pagination from '@/components/Pagination';
import GhostButton from '@/components/GhostButton';
import Button from '@/components/Button';
import SheetModal from '@/components/SheetModal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { IStock } from '../../../../packages/shared/models';
import StockForm from '@/components/forms/StockForm';
import StockFilterMenu from '@/components/filtermenus/StockFilterMenu';
import { useUserStore } from '@/stores/useUserStore';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const windowWidth = Dimensions.get('window').width;

export default function StocksScreen() {
  const { getStocks, stocks, selectStock, selectedStock, getStockCount, stockCount, filters } = useStockStore()
  const { user } = useUserStore()
  const [pageNumber, setPageNumber] = useState(1)
  const [bottomSheetIndex, setBottomSheetIndex] = useState(-1)
  const [bottomSheetIndexFilter, setBottomSheetIndexFilter] = useState(-1)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchStockCount = async () => {
      if (user?.id) {
        setIsLoading(true)
        await getStockCount(user.id)
        setIsLoading(false)
      }
    }
    fetchStockCount()
  }, [user, filters])

  useEffect(() => {
    const fetchStocks = async () => {
      if (user?.id && pageNumber) {
        setIsLoading(true)
        await getStocks(user.id, pageNumber)
        setIsLoading(false)
      }
    }
    fetchStocks()
  }, [pageNumber, filters])

  const openBottomSheet = (stock: IStock | null) => {
    selectStock(stock)
    setBottomSheetIndex(2)
  }

  const openBottomSheetFilter = () => {
    setBottomSheetIndexFilter(1)
  }

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <Layout>
          <Text style={styles.title}>Stoklar</Text>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <GhostButton label='Filtrele' onPress={openBottomSheetFilter} />
            </View>
            <View style={styles.button}>
              <Button label='Stock Ekle' onPress={() => openBottomSheet(null)} />
            </View>
          </View>

          {isLoading ? (
            <ActivityIndicator size="large" color="#000" />
          ) : (
            <View style={styles.cardContainer}>
              {stocks?.map((stock, index) => (
                <TouchableOpacity onPress={() => openBottomSheet(stock)} key={index}>
                  <StockCard stock={stock} />
                </TouchableOpacity>
              ))}
              <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} totalPages={stockCount / 10 + 1} />
            </View>
          )}
        </Layout>

        <SheetModal index={bottomSheetIndex} setIndex={setBottomSheetIndex}>
          <StockForm defaultStock={selectedStock} currentPage={pageNumber} />
        </SheetModal>
        <SheetModal index={bottomSheetIndexFilter} setIndex={setBottomSheetIndexFilter}>
          <StockFilterMenu />
        </SheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "600",
    fontSize: 24,
    marginBottom: 8
  },
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
