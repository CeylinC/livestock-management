import { useState } from "react";
import Checkbox from "../Checkbox";
import DateInput from "../DateInput";
import Input from "../Input";
import Dropdown from "../Dropdown";
import Button from "../Button";
import { IStock } from "../../../../../packages/shared/models";
import { Stock } from "../../../../../packages/shared/classes";
import { saleCategory } from "../../../../../packages/shared/enums";
import { toReadableSalesCategories } from "../../../../../packages/shared/utils/toReadableSalesCategories";

export default function StockForm({
  defaultStock
}: {
  defaultStock: IStock | null
}) {
  const [stock, setStock] = useState(defaultStock ?? new Stock())

  const options = [
    { label: toReadableSalesCategories[saleCategory.equipment], value: saleCategory.equipment },
    { label: toReadableSalesCategories[saleCategory.fertilizer], value: saleCategory.fertilizer },
    { label: toReadableSalesCategories[saleCategory.animal], value: saleCategory.animal },
    { label: toReadableSalesCategories[saleCategory.animalProduct], value: saleCategory.animalProduct },
    { label: toReadableSalesCategories[saleCategory.medicine], value: saleCategory.medicine },
    { label: toReadableSalesCategories[saleCategory.agriculture], value: saleCategory.agriculture },
    { label: toReadableSalesCategories[saleCategory.feed], value: saleCategory.feed },
  ];

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

  return <div className="px-4 py-2 flex flex-col gap-4">
    <div className="font-bold text-xl">{stock.id ? "Stok Kaydını Güncelle" : "Stok Kaydı Oluştur"}</div>
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
    <Button label="Ekle" onClick={onSubmit} />
  </div>
}