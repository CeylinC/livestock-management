import { View, StyleSheet } from "react-native";
import { useAnimalStore } from "@/stores/useAnimalStore";
import { gender } from "../../../../packages/shared/enums";
import { toReadableGender } from "../../../../packages/shared/utils/toReadableGender";
import { animalTypes } from "../../../../packages/shared/enums/animalTypes";
import { toReadableAnimalType } from "../../../../packages/shared/utils/toReadableAnimalType";
import Dropdown from "../Dropdown";
import { useBarnStore } from "@/stores/useBarnStore";

export default function AnimalFilterMenu() {
  const { filters, setFilters } = useAnimalStore();
  const { allBarns } = useBarnStore()

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

const barnOptions = [
  {
    label: "Hepsi",
    value: "",
  },
  ...allBarns?.map(b => ({
    label: b.name,
    value: b.id,
  })) ?? []
]


  const onChangeType = (value: animalTypes | null) => {
    setFilters({ ...filters, type: value })
  }

  const onChangeGender = (value: gender | null) => {
    setFilters({ ...filters, gender: value })
  }

  const onChangeBarn = (value: string | null) => {
    setFilters({ ...filters, barn: value })
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
    <Dropdown
      label="Ağıl"
      options={barnOptions || []}
      value={filters.barn ?? ""}
      onChange={(val) => onChangeBarn(val || null)}
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