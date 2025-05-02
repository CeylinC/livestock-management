import { useState } from "react";
import Input from "../Input";
import Dropdown from "../Dropdown";
import Button from "../Button";
import { IBarn } from "../../../../../packages/shared/models";
import { Barn } from "../../../../../packages/shared/classes";
import { gender } from "../../../../../packages/shared/enums";
import { toReadableGender } from "../../../../../packages/shared/utils/toReadableGender";
import { animalTypes } from "../../../../../packages/shared/enums/animalTypes";
import { toReadableAnimalType } from "../../../../../packages/shared/utils/toReadableAnimalType";
import { useBarnStore } from "../../../../../packages/shared/stores/useBarnStore";
import { useUserStore } from "../../../../../packages/shared/stores/useUserStore";

export default function BarnForm({
  defaultBarn,
  currentPage
}: {
  defaultBarn: IBarn | null
  currentPage: number
}) {
  const { addBarn, updateBarn, deleteBarn, getBarns } = useBarnStore()
  const { user } = useUserStore()
  const [barn, setBarn] = useState(defaultBarn ?? new Barn())

  const options = [
    { label: toReadableGender[gender.female], value: gender.female },
    { label: toReadableGender[gender.male], value: gender.male },
    { label: toReadableGender[gender.karma], value: gender.karma },
  ];

  const typeOptions = Object.values(animalTypes).map((g) => ({
    label: toReadableAnimalType[g],
    value: g
  }));

  const onChangeName = (value: string) => {
    setBarn(prev => ({ ...prev, name: value }))
  }

  const onChangeType = (value: string) => {
    setBarn(prev => ({ ...prev, type: (value as animalTypes) }))
  }

  const onChangeGender = (value: string) => {
    setBarn(prev => ({ ...prev, gender: (value as gender) }))
  }

  const onSubmit = () => {
    if (user?.id) {
      if (barn.id) {
        updateBarn(user.id, barn)
      } else {
        addBarn(user.id, barn)
      }
    }
  }

  const onDelete = async () => {
    if (user?.id) {
      if (barn.id) {
        await deleteBarn(user.id, barn.id)
        await getBarns(user.id, currentPage)
      }
    }
  }

  return <div className="px-4 py-2 flex flex-col gap-4">
    <div className="font-bold text-xl">{barn.id ? "Ağıl Kaydını Güncelle" : "Ağıl Kaydı Oluştur"}</div>
    <Input name="name" label="İsim" value={barn.name} onChange={(value) => onChangeName(value)} />
    <Dropdown
      label="Tür"
      options={typeOptions}
      value={barn.type}
      onChange={onChangeType}
      placeholder="Seçiniz"
    />
    <Dropdown
      label="Cinsiyet"
      options={options}
      value={barn.gender}
      onChange={onChangeGender}
      placeholder="Seçiniz"
    />
    <div className="flex flex-row gap-2">
      <Button label="Ekle" onClick={onSubmit} />
      <Button label="Sil" onClick={onDelete} />
    </div>
  </div>
}