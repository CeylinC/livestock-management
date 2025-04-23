import { Text, View, StyleSheet } from 'react-native';
import Layout from '@/components/Layout';
import BarnCard from '@/components/cards/BarnCard';
import { useEffect, useState } from 'react';
import { useBarnStore } from "../../../../packages/shared/stores/useBarnStore"
import Pagination from '@/components/Pagination';

export default function BarnsScreen() {
  const { getBarns, barns } = useBarnStore()
  const [pageNumber, setPageNumber] = useState(1)

  useEffect(() => {
    if (pageNumber) {
      getBarns(pageNumber)
    }
  }, [pageNumber])
  
  return (
    <Layout>
      <Text>Barns</Text>
      <View style={styles.cardContainer}>
        {
          barns?.map(((barn, index) => (
            <BarnCard barn={barn} key={index}/>
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