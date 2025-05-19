import { View, StyleSheet } from "react-native";
import { saleCategory } from "../../../../packages/shared/enums";
import Dropdown from "../Dropdown";
import { toReadableSalesCategories } from "../../../../packages/shared/utils/toReadableSalesCategories";
import { useStockStore } from "@/stores/useStockStore";

export default function StockFilterMenu() {
  const { filters, setFilters } = useStockStore();

  const categoryOptions = [
  {
    label: "Hepsi",
    value: "",
  },
  ...Object.values(saleCategory).map((g) => ({
    label: toReadableSalesCategories[g],
    value: g,
  })),
];

  const onChangeCategory = (value: saleCategory | null) => {
    setFilters({ ...filters, category: value })
  }

  return <View style={styles.container}>
    <Dropdown
      label="Kategori"
      options={categoryOptions}
      value={filters.category ?? ""}
      onChange={(val) => onChangeCategory((val as saleCategory) || null)}
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