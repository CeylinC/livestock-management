import { View, StyleSheet } from "react-native";
import { paymentState, saleCategory } from "../../../../packages/shared/enums";
import Dropdown from "../Dropdown";
import { toReadableSalesCategories } from "../../../../packages/shared/utils/toReadableSalesCategories";
import { toReadablePaymentState } from "../../../../packages/shared/utils/toReadablePaymentState";
import { useSaleStore } from "../../../../packages/shared/stores/useSaleStore";

export default function SaleFilterMenu() {
  const { filters, setFilters } = useSaleStore();

  const categoryOptions = [
    ...Object.values(saleCategory).map((g) => ({
      label: toReadableSalesCategories[g],
      value: g,
    })),
    {
      label: "Hepsi",
      value: "",
    },
  ];

  const paymentStateOptions = [
    ...Object.values(paymentState).map((g) => ({
      label: toReadablePaymentState[g],
      value: g,
    })),
    {
      label: "Hepsi",
      value: "",
    },
  ];

  const onChangeCategory = (value: saleCategory | null) => {
    setFilters({ ...filters, category: value })
  }

  const onChangePaymentState = (value: paymentState | null) => {
    setFilters({ ...filters, paymentState: value })
  }

  return <View style={styles.container}>
    <Dropdown
      label="Kategori"
      options={categoryOptions}
      value={filters.category ?? ""}
      onChange={(val) => onChangeCategory((val as saleCategory) || null)}
      placeholder="Seçiniz"
    />
    <Dropdown
      label="Ödeme Durumu"
      options={paymentStateOptions}
      value={filters.paymentState ?? ""}
      onChange={(val) => onChangePaymentState((val as paymentState) || null)}
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