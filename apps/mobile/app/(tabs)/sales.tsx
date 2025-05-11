import { Text, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import Layout from '@/components/Layout';
import SaleCard from '@/components/cards/SaleCard';
import Pagination from '@/components/Pagination';
import { useEffect, useState } from 'react';
import { useSaleStore } from "@/stores/useSaleStore"
import GhostButton from '@/components/GhostButton';
import Button from '@/components/Button';
import SheetModal from '@/components/SheetModal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ISale } from '../../../../packages/shared/models';
import SaleForm from '@/components/forms/SaleForm';
import SaleFilterMenu from '@/components/filtermenus/SaleFilterMenu';
import { useUserStore } from '@/stores/useUserStore';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const windowWidth = Dimensions.get('window').width;

export default function SalesScreen() {
  const { getSales, sales, selectSale, selectedSale, getSaleCount, saleCount, filters } = useSaleStore()
  const { user } = useUserStore()
  const [pageNumber, setPageNumber] = useState(1)
  const [bottomSheetIndex, setBottomSheetIndex] = useState(-1)
  const [bottomSheetIndexFilter, setBottomSheetIndexFilter] = useState(-1)

  useEffect(() => {
    if (user?.id) {
      getSaleCount(user.id)
    }
  }, [user, filters])

  useEffect(() => {
    if (user?.id && pageNumber) {
      getSales(user.id, pageNumber)
    }
  }, [pageNumber, filters])

  const openBottomSheet = (sale: ISale | null) => {
    selectSale(sale)
    setBottomSheetIndex(3)
  }

  const openBottomSheetFilter = () => {
    setBottomSheetIndexFilter(1)
  }

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <Layout>
          <Text>Sales</Text>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <GhostButton label='Filtrele' onPress={openBottomSheetFilter} />
            </View>
            <View style={styles.button}>
              <Button label='Satış Ekle' onPress={() => openBottomSheet(null)} />
            </View>
          </View>
          <View style={styles.cardContainer}>
            {
              sales?.map(((sale, index) => (
                <TouchableOpacity onPress={() => openBottomSheet(sale)} key={index}>
                  <SaleCard sale={sale} />
                </TouchableOpacity>
              )))
            }
            <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} totalPages={saleCount / 10 + 1} />
          </View>
        </Layout>
        <SheetModal index={bottomSheetIndex} setIndex={setBottomSheetIndex}>
          <SaleForm defaultSale={selectedSale} currentPage={pageNumber} />
        </SheetModal>
        <SheetModal index={bottomSheetIndexFilter} setIndex={setBottomSheetIndexFilter}>
          <SaleFilterMenu />
        </SheetModal>
      </BottomSheetModalProvider>
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