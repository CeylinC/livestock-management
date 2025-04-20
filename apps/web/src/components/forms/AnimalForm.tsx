import { useState } from "react";
import Checkbox from "../Checkbox";
import DateInput from "../DateInput";
import Input from "../Input";
import Dropdown from "../Dropdown";
import Button from "../Button";
import { IAnimal } from "../../../../../packages/shared/models";
import { Animal } from "../../../../../packages/shared/classes";
import { Dayjs } from "dayjs";
import { gender } from "../../../../../packages/shared/enums";
import { toReadableGender } from "../../../../../packages/shared/utils/toReadableGender";

export default function AnimalForm({
  defaultAnimal
}: {
  defaultAnimal: IAnimal | null
}) {
  const [animal, setAnimal] = useState(defaultAnimal ?? new Animal())

  const options = [
    { label: toReadableGender[gender.female], value: gender.female },
    { label: toReadableGender[gender.male], value: gender.male },
  ];

  const onChangeName = (value: string) => {
    setAnimal(prev => ({ ...prev, name: value }))
  }

  const onChangeEarring = (value: string) => {
    setAnimal(prev => ({ ...prev, earring: value }))
  }

  const onChangeGenus = (value: string) => {
    setAnimal(prev => ({ ...prev, genus: value }))
  }

  const onChangeType = (value: string) => {
    setAnimal(prev => ({ ...prev, type: value }))
  }

  const onChangeWeight = (value: number) => {
    setAnimal(prev => ({ ...prev, weight: value }))
  }

  const onChangeBirthday = (value: Dayjs) => {
    setAnimal(prev => ({ ...prev, birthday: value }))
  }

  const onChangeGender = (value: string) => {
    setAnimal(prev => ({ ...prev, gender: (value as gender) }))
  }

  const onChangePregnant = (value: boolean) => {
    setAnimal(prev => ({ ...prev, isPregnant: value }))
  }


  const onChangeBarn = (value: string) => {
    setAnimal(prev => ({ ...prev, barn: value }))
  }

  const onSubmit = () => {
    console.log(animal)
  }

  return <div className="px-4 py-2 flex flex-col gap-4">
    <div className="font-bold text-xl">{animal.id ? "Hayvan Kaydını Güncelle" : "Hayvan Kaydı Oluştur"}</div>
    <Input name="name" label="İsim" value={animal.name} onChange={(value) => onChangeName(value)} />
    <Input name="earring" label="Kulak Numarası" value={animal.earring} onChange={(value) => onChangeEarring(value)} />
    <Input name="genus" label="Cins" value={animal.genus} onChange={(value) => onChangeGenus(value)} />
    <Input name="type" label="Tür" value={animal.type} onChange={(value) => onChangeType(value)} />
    <Input name="weight" label="Ağırlık (KG)" value={animal.weight.toString()} onChange={(value) => onChangeWeight(Number(value))} />
    <DateInput label="Doğum Tarihi (örn. 19.04.2025)"
      value={animal.birthday}
      onChange={onChangeBirthday}
      format="DD.MM.YYYY" />
    <div className="flex flex-row gap-2 items-center">
      <div className={`${animal.gender === gender.female ? "w-1/2" : "w-full"}`}>
        <Dropdown
          label="Cinsiyet"
          options={options}
          value={animal.gender}
          onChange={onChangeGender}
          placeholder="Seçiniz"
        />
      </div>
      {
        animal.gender == gender.female && (
          <div className="relative top-2.5">
            <Checkbox label="Hamile mi?" checked={animal.isPregnant} onChange={onChangePregnant} />
          </div>
        )
      }
    </div>
    <Dropdown
      label="Ağıl"
      options={options}
      value={animal.barnName}
      onChange={onChangeBarn}
      placeholder="Seçiniz"
      direction="up"
    />
    <Button label="Ekle" onClick={onSubmit} />
  </div>
}