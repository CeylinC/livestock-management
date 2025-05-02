import { useEffect, useState } from "react";
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
import { toReadableAnimalType } from "../../../../../packages/shared/utils/toReadableAnimalType";
import { animalTypes } from "../../../../../packages/shared/enums/animalTypes";
import { useAnimalStore } from "../../../../../packages/shared/stores/useAnimalStore";
import { useUserStore } from "../../../../../packages/shared/stores/useUserStore";

export default function AnimalForm({
  defaultAnimal,
  currentPage
}: {
  defaultAnimal: IAnimal | null
  currentPage: number
}) {
  const { addAnimal, updateAnimal, deleteAnimal, getAnimals } = useAnimalStore()
  const { user } = useUserStore()
  const [animal, setAnimal] = useState(defaultAnimal ?? new Animal())

  const genderOptions = [gender.female, gender.male].map((gender) => ({
    label: toReadableGender[gender],
    value: gender
  }));

  const typeOptions = Object.values(animalTypes).map((g) => ({
    label: toReadableAnimalType[g],
    value: g
  }));

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
    setAnimal(prev => ({ ...prev, type: (value as animalTypes) }))
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
    if (user?.id) {
      if (animal.id) {
        updateAnimal(user.id, animal)
      } else {
        addAnimal(user.id, animal)
      }
    }
  }

  const onDelete = async () => {
    if (user?.id) {
      if (animal.id) {
        await deleteAnimal(user.id, animal.id)
        await getAnimals(user.id, currentPage)
      }
    }
  }

  return <div className="px-4 py-2 flex flex-col gap-4">
    <div className="font-bold text-xl">{animal.id ? "Hayvan Kaydını Güncelle" : "Hayvan Kaydı Oluştur"}</div>
    <Input name="name" label="İsim" value={animal.name} onChange={(value) => onChangeName(value)} />
    <Input name="earring" label="Kulak Numarası" value={animal.earring} onChange={(value) => onChangeEarring(value)} />
    <Dropdown
      label="Tür"
      options={typeOptions}
      value={animal.type}
      onChange={onChangeType}
      placeholder="Seçiniz"
    />
    <Input name="genus" label="Cins" value={animal.genus} onChange={(value) => onChangeGenus(value)} />
    <Input name="weight" label="Ağırlık (KG)" value={animal.weight.toString()} onChange={(value) => onChangeWeight(Number(value))} />
    <DateInput label="Doğum Tarihi (örn. 19.04.2025)"
      value={animal.birthday}
      onChange={onChangeBirthday}
      format="DD.MM.YYYY" />
    <div className="flex flex-row gap-2 items-center">
      <div className={`${animal.gender === gender.female ? "w-1/2" : "w-full"}`}>
        <Dropdown
          label="Cinsiyet"
          options={genderOptions}
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
      options={genderOptions}
      value={animal.barnName}
      onChange={onChangeBarn}
      placeholder="Seçiniz"
      direction="up"
    />
    <div className="flex flex-row gap-2">
      <Button label="Ekle" onClick={onSubmit} />
      <Button label="Sil" onClick={onDelete} />
    </div>
  </div>
}