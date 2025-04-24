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
import BarnForm from '@/components/forms/BarnForm';
import { IBarn } from '../../../../packages/shared/models';
import BarnFilterMenu from '@/components/filtermenus/BarnFilterMenu';

const windowWidth = Dimensions.get('window').width;

export default function BarnsScreen() {
  const { getBarns, barns, selectedBarn, selectBarn } = useBarnStore()
  const [pageNumber, setPageNumber] = useState(1)
  const [bottomSheetIndex, setBottomSheetIndex] = useState(-1)
  const [bottomSheetIndexFilter, setBottomSheetIndexFilter] = useState(-1)

  useEffect(() => {
    if (pageNumber) {
      getBarns(pageNumber)
    }
  }, [pageNumber])

  const openBottomSheet = (barn: IBarn | null) => {
    selectBarn(barn)
    setBottomSheetIndex(1)
  }

  const openBottomSheetFilter = () => {
    setBottomSheetIndexFilter(1)
  }

  return (
    <GestureHandlerRootView>
      <Layout>
        <Text>Barns</Text>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <GhostButton label='Filtrele' onPress={() => {}} />
          </View>
          <View style={styles.button}>
            <Button label='Ağıl Ekle' onPress={() => openBottomSheet(null)} />
          </View>
        </View>
        <View style={styles.cardContainer}>
          {
            barns?.map(((barn, index) => (
              <TouchableOpacity onPress={() => openBottomSheet(barn)} key={index}>
                <BarnCard barn={barn} />
              </TouchableOpacity>
            )))
          }
          <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} totalPages={5} />
        </View>
      </Layout>
      <SheetModal index={bottomSheetIndex} setIndex={setBottomSheetIndex}>
        <BarnForm defaultBarn={selectedBarn}/>
      </SheetModal>
      <SheetModal index={bottomSheetIndexFilter} setIndex={setBottomSheetIndexFilter}>
        <BarnFilterMenu/>
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