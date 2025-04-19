import { useState } from "react";
import Checkbox from "../Checkbox";
import DateInput from "../DateInput";
import Input from "../Input";
import Dropdown from "../Dropdown";
import Button from "../Button";

export default function AnimalForm() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selected, setSelected] = useState("");

  const options = [
    { label: "Dişi", value: "female" },
    { label: "Erkek", value: "male" },
  ];

  return <div className="px-4 py-2 flex flex-col gap-4">
    <div className="font-bold text-xl">Hayvan Kaydı Oluştur</div>
    <Input name="name" label="İsim" onChange={() => { }} />
    <Input name="earring" label="Kulak Numarası" onChange={() => { }} />
    <Input name="genus" label="Cins" onChange={() => { }} />
    <Input name="type" label="Tür" onChange={() => { }} />
    <Input name="weight" label="Ağırlık" onChange={() => { }} />
    <DateInput label="Doğum Tarihi (örn. 19.04.2025)"
      value={selectedDate}
      onChange={setSelectedDate}
      format="DD.MM.YYYY" />
    <Dropdown
      label="Cinsiyet"
      options={options}
      value={selected}
      onChange={setSelected}
      placeholder="Seçiniz"
    />
    <Checkbox label="Hamile mi?" checked={true} onChange={() => { }} />
    <Dropdown
      label="Ağıl"
      options={options}
      value={selected}
      onChange={setSelected}
      placeholder="Seçiniz"
      direction="up"
    />
    <Button label="Ekle" onClick={() => {}}/>
  </div>
}