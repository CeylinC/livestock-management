import { Text, StyleSheet, View } from 'react-native';
import Layout from '@/components/Layout';
import SaleCard from '@/components/cards/SaleCard';
import Pagination from '@/components/Pagination';
import { useEffect, useState } from 'react';
import { useSaleStore } from "../../../../packages/shared/stores/useSaleStore"

export default function SalesScreen() {
  const { getSales, sales } = useSaleStore()
  const [pageNumber, setPageNumber] = useState(1)

  useEffect(() => {
    if (pageNumber) {
      getSales(pageNumber)
    }
  }, [pageNumber])

  return (
    <Layout>
      <Text>Sales</Text>
      <View style={styles.cardContainer}>
        {
          sales?.map(((sale, index) => (
            <SaleCard sale={sale} key={index} />
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