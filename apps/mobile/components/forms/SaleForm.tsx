import { useState } from "react";
import DateInput from "../DateInput";
import Input from "../Input";
import Dropdown from "../Dropdown";
import Button from "../Button";
import { Dayjs } from "dayjs";
import { ISale } from "../../../../packages/shared/models";
import { paymentState, saleCategory } from "../../../../packages/shared/enums";
import { Sale } from "../../../../packages/shared/classes";
import { toReadableSalesCategories } from "../../../../packages/shared/utils/toReadableSalesCategories";
import { toReadablePaymentState } from "../../../../packages/shared/utils/toReadablePaymentState";
import { View, StyleSheet } from "react-native";

export default function SaleForm({
  defaultSale
}: {
  defaultSale: ISale | null
}) {
  const [sale, setSale] = useState(defaultSale ?? new Sale())

  const categoryOptions = Object.values(saleCategory).map((g) => ({
    label: toReadableSalesCategories[g],
    value: g
  }));

  const PaymentStateOptions = Object.values(paymentState).map((g) => ({
    label: toReadablePaymentState[g],
    value: g
  }));

  const onChangeName = (value: string) => {
    setSale(prev => ({ ...prev, name: value }))
  }

  const onChangeCategory = (value: string) => {
    setSale(prev => ({ ...prev, category: (value as saleCategory) }))
  }

  const onChangeType = (value: string) => {
    setSale(prev => ({ ...prev, type: value }))
  }

  const onChangePrice = (value: string) => {
    setSale(prev => ({ ...prev, price: value }))
  }

  const onChangeSaleDate = (value: Dayjs) => {
    setSale(prev => ({ ...prev, saleDate: value }))
  }

  const onChangeRecipientName = (value: string) => {
    setSale(prev => ({ ...prev, recipientName: value }))
  }

  const onChangeContact = (value: string) => {
    setSale(prev => ({ ...prev, contact: value }))
  }

  const onChangePaymentState = (value: string) => {
    setSale(prev => ({ ...prev, paymentState: (value as paymentState) }))
  }

  const onChangePaymentDate = (value: Dayjs) => {
    setSale(prev => ({ ...prev, paymentDate: value }))
  }

  const onSubmit = () => {
    console.log(sale)
  }

  return <View style={styles.container}>
    <Input name="name" label="İsim" value={sale.name} onChange={(value) => onChangeName(value)} />
    <Dropdown
      label="Kategori"
      options={categoryOptions}
      value={sale.category}
      onChange={onChangeCategory}
      placeholder="Seçiniz"
    />
    <Input name="type" label="Miktar" value={sale.amount} onChange={(value) => onChangeType(value)} />
    <Input name="type" label="Ücret" value={sale.price} onChange={(value) => onChangePrice(value)} />
    <DateInput label="Satış Tarihi (örn. 19.04.2025)"
      value={sale.saleDate}
      onChange={onChangeSaleDate}
      format="DD.MM.YYYY" />
    <Input name="type" label="Alıcı İsmi" value={sale.recipientName} onChange={(value) => onChangeRecipientName(value)} />
    <Input name="type" label="İletişim" value={sale.contact} onChange={(value) => onChangeContact(value)} />
    <Dropdown
      label="Ödeme Durumu"
      options={PaymentStateOptions}
      value={sale.paymentState}
      onChange={onChangePaymentState}
      placeholder="Seçiniz"
    />
    <DateInput label="Satış Tarihi (örn. 19.04.2025)"
      value={sale.saleDate}
      onChange={onChangePaymentDate}
      format="DD.MM.YYYY" />
    <Button label={defaultSale?.id ? "Kaydı Güncelle" : "Kayıt Oluştur"} onPress={onSubmit} />
  </View >
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 32,
    display: "flex",
    gap: 8
  }
})