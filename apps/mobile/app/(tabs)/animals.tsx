import { StyleSheet, Text, View } from 'react-native';
import Layout from '@/components/Layout';
import AnimalCard from '@/components/cards/AnimalCard';
import Pagination from '@/components/Pagination';
import { useEffect, useState } from 'react';
import { useAnimalStore } from "../../../../packages/shared/stores/useAnimalStore"

export default function AnimalsScreen() {
  const { getAnimals, animals } = useAnimalStore()
  const [pageNumber, setPageNumber] = useState(1)

  useEffect(() => {
    if (pageNumber) {
      getAnimals(pageNumber)
    }
  }, [pageNumber])

  return (
    <Layout>
      <Text>Animals</Text>
      <View style={styles.cardContainer}>
        {
          animals?.map(((animal, index) => (
            <AnimalCard animal={animal} key={index}/>
          )))
        }
        <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} totalPages={5} />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 8
  }
})