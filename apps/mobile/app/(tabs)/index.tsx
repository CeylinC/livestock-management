import { StyleSheet, Text, View } from 'react-native';

import Layout from '@/components/Layout';
import { useHomepageStore } from '@/stores/useHomepageStore';
import { useUserStore } from '@/stores/useUserStore';
import { useEffect } from 'react';
import { toReadableAnimalType } from '../../../../packages/shared/utils/toReadableAnimalType';
import { animalTypes } from '../../../../packages/shared/enums/animalTypes';
import Badge from '@/components/Badge';
import { gender } from '../../../../packages/shared/enums';
import { toReadableGender } from '../../../../packages/shared/utils/toReadableGender';

export default function HomeScreen() {
  const { getHomepageData, animals, barns, totalAnimal, totalBarn } = useHomepageStore()
  const { user } = useUserStore()

  useEffect(() => {
    if (user?.id) {
      getHomepageData(user.id)
    }
  }, [user?.id])
  
  return (
    <Layout>
      <Text>Anasayfa</Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Toplam Hayvan:</Text>
          <Text style={styles.value}>{totalAnimal}</Text>
        </View>

        <View style={styles.grid}>
          {animals && Object.entries(animals).map(([type, counts]) => (
            <View key={type} style={styles.cardItem}>
              <Text style={styles.cardTitle}>
                {toReadableAnimalType[type as animalTypes]} Hayvan Sayısı: {counts.FEMALE + counts.MALE}
              </Text>
              <View style={styles.textContainer}>
                <Text style={styles.text}>
                  <Badge value={gender.male} label={toReadableGender[gender.male]} />: {counts.MALE}
                </Text>
                <Text style={styles.text}>
                  <Badge value={gender.female} label={toReadableGender[gender.female]} />: {counts.FEMALE}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Toplam Ağıl:</Text>
          <Text style={styles.value}>{totalBarn}</Text>
        </View>

        <View style={styles.grid}>
          {barns && Object.entries(barns).map(([type, counts]) => (
            <View key={type} style={styles.cardItem}>
              <Text style={styles.cardTitle}>
                {toReadableAnimalType[type as animalTypes]} Ağıl Sayısı: {counts.FEMALE + counts.MALE + counts.KARMA}
              </Text>
              <View style={styles.textContainer}>
                <Text style={styles.text}>
                  <Badge value={gender.male} label={toReadableGender[gender.male]} />: {counts.MALE}
                </Text>
                <Text style={styles.text}>
                  <Badge value={gender.female} label={toReadableGender[gender.female]} />: {counts.FEMALE}
                </Text>
                <Text style={styles.text}>
                  <Badge value={gender.karma} label={toReadableGender[gender.karma]} />: {counts.KARMA}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardItem: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  textContainer: {
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
  },
})
