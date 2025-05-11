import { Text, View, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import Layout from '@/components/Layout';
import BarnCard from '@/components/cards/BarnCard';
import { useEffect, useState } from 'react';
import { useBarnStore } from "@/stores/useBarnStore"
import Pagination from '@/components/Pagination';
import GhostButton from '@/components/GhostButton';
import Button from '@/components/Button';
import SheetModal from '@/components/SheetModal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BarnForm from '@/components/forms/BarnForm';
import { IBarn } from '../../../../packages/shared/models';
import BarnFilterMenu from '@/components/filtermenus/BarnFilterMenu';
import { useUserStore } from '@/stores/useUserStore';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const windowWidth = Dimensions.get('window').width;

export default function BarnsScreen() {
  const { getBarns, barns, selectedBarn, selectBarn, getBarnCount, barnCount, filters } = useBarnStore()
  const { user } = useUserStore()

  const [pageNumber, setPageNumber] = useState(1)
  const [bottomSheetIndex, setBottomSheetIndex] = useState(-1)
  const [bottomSheetIndexFilter, setBottomSheetIndexFilter] = useState(-1)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchBarnCount = async () => {
      if (user?.id) {
        setIsLoading(true)
        await getBarnCount(user.id)
        setIsLoading(false)
      }
    }
    fetchBarnCount()
  }, [user, filters])

  useEffect(() => {
    const fetchBarns = async () => {
      if (user?.id && pageNumber) {
        setIsLoading(true)
        await getBarns(user.id, pageNumber)
        setIsLoading(false)
      }
    }
    fetchBarns()
  }, [pageNumber, filters])

  const openBottomSheet = (barn: IBarn | null) => {
    selectBarn(barn)
    setBottomSheetIndex(1)
  }

  const openBottomSheetFilter = () => {
    setBottomSheetIndexFilter(1)
  }

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <Layout>
          <Text>Barns</Text>

          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <GhostButton label='Filtrele' onPress={openBottomSheetFilter} />
            </View>
            <View style={styles.button}>
              <Button label='Ağıl Ekle' onPress={() => openBottomSheet(null)} />
            </View>
          </View>

          {isLoading ? (
            <ActivityIndicator size="large" color="#000" />
          ) : (
            <View style={styles.cardContainer}>
              {barns?.map((barn, index) => (
                <TouchableOpacity onPress={() => openBottomSheet(barn)} key={index}>
                  <BarnCard barn={barn} />
                </TouchableOpacity>
              ))}
              <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} totalPages={barnCount / 10 + 1} />
            </View>
          )}
        </Layout>

        <SheetModal index={bottomSheetIndex} setIndex={setBottomSheetIndex}>
          <BarnForm defaultBarn={selectedBarn} currentPage={pageNumber} />
        </SheetModal>
        <SheetModal index={bottomSheetIndexFilter} setIndex={setBottomSheetIndexFilter}>
          <BarnFilterMenu />
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
