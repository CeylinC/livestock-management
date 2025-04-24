import { View, StyleSheet } from "react-native";
import { useState } from "react";
import { IBarn } from "../../../../packages/shared/models";
import { Barn } from "../../../../packages/shared/classes";
import { gender } from "../../../../packages/shared/enums";
import { toReadableGender } from "../../../../packages/shared/utils/toReadableGender";
import { toReadableAnimalType } from "../../../../packages/shared/utils/toReadableAnimalType";
import { animalTypes } from "../../../../packages/shared/enums/animalTypes";
import Input from "../Input";
import Dropdown from "../Dropdown";
import Button from "../Button";

export default function BarnForm({
  defaultBarn
}: {
  defaultBarn: IBarn | null
}) {
  const [barn, setBarn] = useState(defaultBarn ?? new Barn())

  const genderOptions = [gender.female, gender.male].map((gender) => ({
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
    console.log(barn)
  }

  return <View style={styles.container}>
    <Input name={"name"} label={"İsim"} value={barn.name} onChange={onChangeName} />
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
    <Button label={defaultBarn?.id ? "Kaydı Güncelle" : "Kayıt Oluştur"} onPress={onSubmit} />
  </View>
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 32,
    display: "flex",
    gap: 8
  }
})