import { View, StyleSheet } from "react-native";
import { useAnimalStore } from "@/stores/useAnimalStore";
import { gender } from "../../../../packages/shared/enums";
import { toReadableGender } from "../../../../packages/shared/utils/toReadableGender";
import { animalTypes } from "../../../../packages/shared/enums/animalTypes";
import { toReadableAnimalType } from "../../../../packages/shared/utils/toReadableAnimalType";
import Dropdown from "../Dropdown";

export default function BarnFilterMenu() {
  const { filters, setFilters } = useAnimalStore();

  const genderOptions = [
    {
      label: "Hepsi",
      value: "",
    },
    ...Object.values(gender).map((g) => ({
      label: toReadableGender[g],
      value: g.toString(),
    })),
  ];

  const typeOptions = [
    {
      label: "Hepsi",
      value: "",
    },
    ...Object.values(animalTypes).map((g) => ({
      label: toReadableAnimalType[g],
      value: g,
    })),
  ];

  const onChangeType = (value: animalTypes | null) => {
    setFilters({ ...filters, type: value })
  }

  const onChangeGender = (value: gender | null) => {
    setFilters({ ...filters, gender: value })
  }

  return <View style={styles.container}>
    <Dropdown
      label="Tür"
      options={typeOptions}
      value={filters.type ?? ""}
      onChange={(val) => onChangeType((val as animalTypes) || null)}
      placeholder="Seçiniz"
    />
    <Dropdown
      label="Cinsiyet"
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