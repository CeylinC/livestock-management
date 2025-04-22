import { StyleSheet, Text, View } from 'react-native';
import Layout from '@/components/Layout';
import AnimalCard from '@/components/cards/AnimalCard';

export default function AnimalsScreen() {
  return (
    <Layout>
      <Text>Animals</Text>
      <View style={styles.cardContainer}>
        <AnimalCard />
        <AnimalCard />
        <AnimalCard />
        <AnimalCard />
        <AnimalCard />
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