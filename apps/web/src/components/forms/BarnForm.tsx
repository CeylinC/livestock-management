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
import { useBarnStore } from "@/stores/useBarnStore";
import { useUserStore } from "@/stores/useUserStore";

export default function BarnForm({
  defaultBarn,
  currentPage,
  onClose
}: {
  defaultBarn: IBarn | null
  currentPage: number
  onClose: () => void
}) {
  const { addBarn, updateBarn, deleteBarn, getBarns } = useBarnStore()
  const { user } = useUserStore()
  const [barn, setBarn] = useState(defaultBarn ?? new Barn())

    const genderOptions = Object.values(gender).map((gender) => ({
    label: toReadableGender[gender],
    value: gender
  }));

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
      onClose()
    }
  }

  const onDelete = async () => {
    if (user?.id) {
      if (barn.id) {
        await deleteBarn(user.id, barn.id)
        await getBarns(user.id, currentPage)
        onClose()
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
      options={genderOptions}
      value={barn.gender}
      onChange={onChangeGender}
      placeholder="Seçiniz"
    />
    <div className="flex flex-row gap-2">
      <Button label={barn.id ? "Güncelle" : "Ekle" } onClick={onSubmit} />
      <Button label="Sil" onClick={onDelete} variant="danger"/>
    </div>
  </div>
}