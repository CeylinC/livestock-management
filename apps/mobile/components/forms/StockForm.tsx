import { View, StyleSheet } from "react-native";
import { useState } from "react";
import { IStock } from "../../../../packages/shared/models";
import { Stock } from "../../../../packages/shared/classes";
import { saleCategory } from "../../../../packages/shared/enums";
import Input from "../Input";
import Dropdown from "../Dropdown";
import Button from "../Button";
import { toReadableSalesCategories } from "../../../../packages/shared/utils/toReadableSalesCategories";
import { useStockStore } from "@/stores/useStockStore";
import { useUserStore } from "@/stores/useUserStore";

export default function StockForm({
  defaultStock,
  currentPage,
  onClose
}: {
  defaultStock: IStock | null
  currentPage: number
  onClose: () => void
}) {
  const [stock, setStock] = useState(defaultStock ?? new Stock())
  const { addStock, updateStock, deleteStock, getStocks } = useStockStore()
  const { user } = useUserStore()

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

  const onChangeAmount = (value: string) => {
    setStock(prev => ({ ...prev, amount: value }))
  }

  const onChangeDealer = (value: string) => {
    setStock(prev => ({ ...prev, dealer: value }))
  }

  const onChangeStorage = (value: string) => {
    setStock(prev => ({ ...prev, storage: value }))
  }

  const onSubmit = () => {
    if (user?.id) {
      if (stock.id) {
        updateStock(user.id, stock)
      } else {
        addStock(user.id, stock)
      }
      onClose()
    }
  }

  const onDelete = async () => {
    if (user?.id) {
      if (stock.id) {
        await deleteStock(user.id, stock.id)
        await getStocks(user.id, currentPage)
        onClose()
      }
    }
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
    <Input name="amount" label="Miktar" value={stock.amount} onChange={(value) => onChangeAmount(value)} />
    <Input name="dealer" label="Satıcı" value={stock.dealer} onChange={(value) => onChangeDealer(value)} />
    <Input name="storage" label="Stok Yeri" value={stock.storage} onChange={(value) => onChangeStorage(value)} />

    {defaultStock?.id ?
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}><Button label={"Kaydı Güncelle"} onPress={onSubmit} /></View>
        <View style={styles.buttonContainer}><Button label={"Kaydı Sil"} onPress={onDelete} variant="danger"/></View>
      </View>
      : <View><Button label={"Kayıt Oluştur"} onPress={onSubmit} /></View>
    }
  </View>
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 32,
    display: "flex",
    gap: 8
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 8
  },
  buttonContainer: {
    width: "50%"
  }
})