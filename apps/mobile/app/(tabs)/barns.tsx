import { Text, View, StyleSheet } from 'react-native';
import Layout from '@/components/Layout';
import BarnCard from '@/components/cards/BarnCard';

export default function BarnsScreen() {
  return (
    <Layout>
      <Text>Barns</Text>
      <View style={styles.cardContainer}>
        <BarnCard />
        <BarnCard />
        <BarnCard />
        <BarnCard />
        <BarnCard />
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