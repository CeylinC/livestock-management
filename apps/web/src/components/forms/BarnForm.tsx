import { useState } from "react";
import Checkbox from "../Checkbox";
import DateInput from "../DateInput";
import Input from "../Input";
import Dropdown from "../Dropdown";
import Button from "../Button";
import { IBarn } from "../../../../../packages/shared/models";
import { Barn } from "../../../../../packages/shared/classes";
import { Dayjs } from "dayjs";
import { gender } from "../../../../../packages/shared/enums";
import { toReadableGender } from "../../../../../packages/shared/utils/toReadableGender";

export default function BarnForm({
  defaultBarn
}: {
  defaultBarn: IBarn | null
}) {
  const [barn, setBarn] = useState(defaultBarn ?? new Barn())

  const options = [
    { label: toReadableGender[gender.female], value: gender.female },
    { label: toReadableGender[gender.male], value: gender.male },
    { label: toReadableGender[gender.karma], value: gender.karma },
  ];

  const onChangeName = (value: string) => {
    setBarn(prev => ({ ...prev, name: value }))
  }

  const onChangeType = (value: string) => {
    setBarn(prev => ({ ...prev, type: value }))
  }

  const onChangeGender = (value: string) => {
    setBarn(prev => ({ ...prev, gender: (value as gender) }))
  }

  const onSubmit = () => {
    console.log(barn)
  }

  return <div className="px-4 py-2 flex flex-col gap-4">
    <div className="font-bold text-xl">{barn.id ? "Ağıl Kaydını Güncelle" : "Ağıl Kaydı Oluştur"}</div>
    <Input name="name" label="İsim" value={barn.name} onChange={(value) => onChangeName(value)} />
    <Input name="type" label="Tür" value={barn.type} onChange={(value) => onChangeType(value)} />
    <Dropdown
      label="Cinsiyet"
      options={options}
      value={barn.gender}
      onChange={onChangeGender}
      placeholder="Seçiniz"
    />
    <Button label="Ekle" onClick={onSubmit} />
  </div>
}