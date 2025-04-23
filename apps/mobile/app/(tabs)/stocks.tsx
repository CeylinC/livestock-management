import { Text, View, StyleSheet } from 'react-native';
import Layout from '@/components/Layout';
import StockCard from '@/components/cards/StockCard';
import { useEffect, useState } from 'react';
import { useStockStore } from "../../../../packages/shared/stores/useStockStore"
import Pagination from '@/components/Pagination';

export default function StocksScreen() {
  const { getStocks, stocks } = useStockStore()
  const [pageNumber, setPageNumber] = useState(1)

  useEffect(() => {
    if (pageNumber) {
      getStocks(pageNumber)
    }
  }, [pageNumber])

  return (
    <Layout>
      <Text>Stocks</Text>
      <View style={styles.cardContainer}>
        {
          stocks?.map(((stock, index) => (
            <StockCard stock={stock} key={index}/>
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