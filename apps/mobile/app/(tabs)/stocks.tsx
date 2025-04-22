import { Text, View, StyleSheet } from 'react-native';
import Layout from '@/components/Layout';
import StockCard from '@/components/cards/StockCard';

export default function StocksScreen() {
  return (
    <Layout>
      <Text>Stocks</Text>
      <View style={styles.cardContainer}>
        <StockCard />
        <StockCard />
        <StockCard />
        <StockCard />
        <StockCard />
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