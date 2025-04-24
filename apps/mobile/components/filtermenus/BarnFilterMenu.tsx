import { View, StyleSheet } from "react-native";
import { useAnimalStore } from "../../../../packages/shared/stores/useAnimalStore";
import { gender } from "../../../../packages/shared/enums";
import { toReadableGender } from "../../../../packages/shared/utils/toReadableGender";
import { animalTypes } from "../../../../packages/shared/enums/animalTypes";
import { toReadableAnimalType } from "../../../../packages/shared/utils/toReadableAnimalType";
import Dropdown from "../Dropdown";

export default function BarnFilterMenu() {
  const { filters, setFilters } = useAnimalStore();

  const genderOptions = [
    ...[gender.female, gender.male].map((g) => ({
      label: toReadableGender[g],
      value: g.toString(),
    })),
    {
      label: "Hepsi",
      value: "",
    },
  ];

  const typeOptions = [
    ...Object.values(animalTypes).map((g) => ({
      label: toReadableAnimalType[g],
      value: g,
    })),
    {
      label: "Hepsi",
      value: "",
    },
  ];

  const onChangeType = (value: animalTypes | null) => {
    setFilters({ ...filters, type: value })
  }

  const onChangeGender = (value: gender | null) => {
    setFilters({ ...filters, gender: value })
  }

  return <View style={styles.container}>
    <Dropdown
      label="Cinsiyet"
      options={typeOptions}
      value={filters.type ?? ""}
      onChange={(val) => onChangeType((val as animalTypes) || null)}
      placeholder="Seçiniz"
    />
    <Dropdown
      label="Tür"
      options={genderOptions}
      value={filters.gender ?? ""}
      onChange={(val) => onChangeGender((val as gender) || null)}
      placeholder="Seçiniz"
    />
  </View>
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 32,
    display: "flex",
    gap: 8
  }
})