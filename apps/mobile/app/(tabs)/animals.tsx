import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Layout from '@/components/Layout';
import AnimalCard from '@/components/cards/AnimalCard';
import Pagination from '@/components/Pagination';
import { useEffect, useState } from 'react';
import { useAnimalStore } from "../../../../packages/shared/stores/useAnimalStore"
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SheetModal from '@/components/SheetModal';
import Button from '@/components/Button';
import GhostButton from '@/components/GhostButton';

const windowWidth = Dimensions.get('window').width;

export default function AnimalsScreen() {
  const { getAnimals, animals } = useAnimalStore()
  const [pageNumber, setPageNumber] = useState(1)
  const [bottomSheetIndex, setBottomSheetIndex] = useState(-1)

  useEffect(() => {
    if (pageNumber) {
      getAnimals(pageNumber)
    }
  }, [pageNumber])

  const openBottomSheet = () => {
    setBottomSheetIndex(1)
  }

  return (
    <GestureHandlerRootView>
      <Layout>
        <Text>Animals</Text>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <GhostButton label='Filtrele' onPress={openBottomSheet} />
          </View>
          <View style={styles.button}>
            <Button label='Hayvan Ekle' onPress={openBottomSheet} />
          </View>
        </View>
        <View style={styles.cardContainer}>
          {
            animals?.map(((animal, index) => (
              <TouchableOpacity onPress={openBottomSheet} key={index}>
                <AnimalCard animal={animal} />
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