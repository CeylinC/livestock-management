import { Dimensions, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import Layout from '@/components/Layout';
import AnimalCard from '@/components/cards/AnimalCard';
import Pagination from '@/components/Pagination';
import { useEffect, useState } from 'react';
import { useAnimalStore } from "@/stores/useAnimalStore"
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SheetModal from '@/components/SheetModal';
import Button from '@/components/Button';
import GhostButton from '@/components/GhostButton';
import AnimalForm from '@/components/forms/AnimalForm';
import { IAnimal } from '../../../../packages/shared/models';
import AnimalFilterMenu from '@/components/filtermenus/AnimalFilterMenu';
import { useUserStore } from '@/stores/useUserStore';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useBarnStore } from '@/stores/useBarnStore';

const windowWidth = Dimensions.get('window').width;

export default function AnimalsScreen() {
  const { getAnimals, animals, selectAnimal, selectedAnimal, getAnimalCount, animalCount, filters } = useAnimalStore()
  const { user } = useUserStore()
  const { getAllBarns } = useBarnStore()

  const [pageNumber, setPageNumber] = useState(1)
  const [bottomSheetIndex, setBottomSheetIndex] = useState(-1)
  const [bottomSheetIndexFilter, setBottomSheetIndexFilter] = useState(-1)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchBarns = async () => {
      if (user?.id) {
        setIsLoading(true)
        await getAllBarns(user.id)
        setIsLoading(false)
      }
    }
    fetchBarns()
  }, [])

  useEffect(() => {
    const fetchAnimalCount = async () => {
      if (user?.id) {
        setIsLoading(true)
        await getAnimalCount(user.id)
        setIsLoading(false)
      }
    }
    fetchAnimalCount()
  }, [user, filters])

  useEffect(() => {
    const fetchAnimals = async () => {
      if (user?.id && pageNumber) {
        setIsLoading(true)
        await getAnimals(user.id, pageNumber)
        setIsLoading(false)
      }
    }
    fetchAnimals()
  }, [pageNumber, filters])

  const openBottomSheet = (animal: IAnimal | null) => {
    selectAnimal(animal)
    setBottomSheetIndex(2)
  }

  const openBottomSheetFilter = () => {
    setBottomSheetIndexFilter(1)
  }

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <Layout>
          <Text style={styles.title}>Hayvanlar</Text>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <GhostButton label='Filtrele' onPress={openBottomSheetFilter} />
            </View>
            <View style={styles.button}>
              <Button label='Hayvan Ekle' onPress={() => openBottomSheet(null)} />
            </View>
          </View>

          {isLoading ? (
            <ActivityIndicator size="large" color="#000" />
          ) : (
            <View style={styles.cardContainer}>
              {animals?.map((animal, index) => (
                <TouchableOpacity onPress={() => openBottomSheet(animal)} key={index}>
                  <AnimalCard animal={animal} />
                </TouchableOpacity>
              ))}
              <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} totalPages={animalCount / 10 + 1} />
            </View>
          )}
        </Layout>

        <SheetModal index={bottomSheetIndex} setIndex={setBottomSheetIndex}>
          <AnimalForm defaultAnimal={selectedAnimal} currentPage={pageNumber} />
        </SheetModal>
        <SheetModal index={bottomSheetIndexFilter} setIndex={setBottomSheetIndexFilter}>
          <AnimalFilterMenu />
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
