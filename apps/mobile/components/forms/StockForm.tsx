import { View, StyleSheet } from "react-native";
import { useState } from "react";
import { IStock } from "../../../../packages/shared/models";
import { Stock } from "../../../../packages/shared/classes";
import { saleCategory } from "../../../../packages/shared/enums";
import Input from "../Input";
import Dropdown from "../Dropdown";
import Button from "../Button";
import { toReadableSalesCategories } from "../../../../packages/shared/utils/toReadableSalesCategories";

export default function StockForm({
  defaultStock
}: {
  defaultStock: IStock | null
}) {
  const [stock, setStock] = useState(defaultStock ?? new Stock())

  const options = Object.values(saleCategory).map((g) => ({
    label: toReadableSalesCategories[g],
    value: g
  }));

  const onChangeName = (value: string) => {
    setStock(prev => ({ ...prev, name: value }))
  }

  const onChangeCategory = (value: string) => {
    setStock(prev => ({ ...prev, category: (value as saleCategory) }))
  }

  const onChangeType = (value: string) => {
    setStock(prev => ({ ...prev, type: value }))
  }

  const onChangeDealer = (value: string) => {
    setStock(prev => ({ ...prev, dealer: value }))
  }

  const onChangeStorage = (value: string) => {
    setStock(prev => ({ ...prev, storage: value }))
  }

  const onSubmit = () => {
    console.log(stock)
  }

  return <View style={styles.container}>
    <Input name="name" label="İsim" value={stock.name} onChange={(value) => onChangeName(value)} />
    <Dropdown
      label="Kategori"
      options={options}
      value={stock.category}
      onChange={onChangeCategory}
      placeholder="Seçiniz"
    />
    <Input name="type" label="Miktar" value={stock.amount} onChange={(value) => onChangeType(value)} />
    <Input name="type" label="Satıcı" value={stock.dealer} onChange={(value) => onChangeDealer(value)} />
    <Input name="type" label="Stok Yeri" value={stock.storage} onChange={(value) => onChangeStorage(value)} />

    <Button label={defaultStock?.id ? "Kaydı Güncelle" : "Kayıt Oluştur"} onPress={onSubmit} />
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