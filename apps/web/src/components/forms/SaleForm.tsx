import { useState } from "react";
import DateInput from "../DateInput";
import Input from "../Input";
import Dropdown from "../Dropdown";
import Button from "../Button";
import { ISale } from "../../../../../packages/shared/models";
import { Sale } from "../../../../../packages/shared/classes";
import { paymentState, saleCategory } from "../../../../../packages/shared/enums";
import { toReadableSalesCategories } from "../../../../../packages/shared/utils/toReadableSalesCategories";
import { Dayjs } from "dayjs";
import { toReadablePaymentState } from "../../../../../packages/shared/utils/toReadablePaymentState";
import { useSaleStore } from "../../../../../packages/shared/stores/useSaleStore";
import { useUserStore } from "../../../../../packages/shared/stores/useUserStore";

export default function StockForm({
  defaultSale,
  currentPage
}: {
  defaultSale: ISale | null
  currentPage: number
}) {
  const { addSale, updateSale, deleteSale, getSales } = useSaleStore()
  const { user } = useUserStore()
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
    if (user?.id) {
      if (sale.id) {
        updateSale(user.id, sale)
      } else {
        addSale(user.id, sale)
      }
    }
  }

  const onDelete = async () => {
    if (user?.id) {
      if (sale.id) {
        await deleteSale(user.id, sale.id)
        await getSales(user.id, currentPage)
      }
    }
  }

  return <div className="px-4 py-2 flex flex-col gap-4">
    <div className="font-bold text-xl">{sale.id ? "Satış Kaydını Güncelle" : "Satış Kaydı Oluştur"}</div>
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
    <div className="flex flex-row gap-2 items-center">
      <div className="w-1/2">
        <Dropdown
          label="Ödeme Durumu"
          options={PaymentStateOptions}
          value={sale.paymentState}
          onChange={onChangePaymentState}
          placeholder="Seçiniz"
        />
      </div>
      <div className="w-1/2">
        <DateInput label="Satış Tarihi (örn. 19.04.2025)"
          value={sale.saleDate}
          onChange={onChangePaymentDate}
          format="DD.MM.YYYY" />
      </div>
    </div>
    <div className="flex flex-row gap-2">
      <Button label="Ekle" onClick={onSubmit} />
      <Button label="Sil" onClick={onDelete} />
    </div>
  </div>
}