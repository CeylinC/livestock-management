import { Text, StyleSheet, View } from 'react-native';
import Layout from '@/components/Layout';
import SaleCard from '@/components/cards/SaleCard';

export default function SalesScreen() {
  return (
    <Layout>
      <Text>Sales</Text>
      <View style={styles.cardContainer}>
        <SaleCard />
        <SaleCard />
        <SaleCard />
        <SaleCard />
        <SaleCard />
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