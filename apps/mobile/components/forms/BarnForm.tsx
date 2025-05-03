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
import { useBarnStore } from "@/stores/useBarnStore";
import { useUserStore } from "@/stores/useUserStore";

export default function BarnForm({
  defaultBarn,
  currentPage
}: {
  defaultBarn: IBarn | null
  currentPage: number
}) {
  const [barn, setBarn] = useState(defaultBarn ?? new Barn())
  const { addBarn, updateBarn, deleteBarn, getBarns } = useBarnStore()
  const { user } = useUserStore()

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
    {defaultBarn?.id ?
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}><Button label={"Kaydı Güncelle"} onPress={onSubmit} /></View>
        <View style={styles.buttonContainer}><Button label={"Kaydı Sil"} onPress={onDelete} /></View>
      </View>
      : <View style={styles.buttonContainer}><Button label={"Kayıt Oluştur"} onPress={onSubmit} /></View>
    }
  </View>
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 32,
    display: "flex",
    gap: 8
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 8
  },
  buttonContainer: {
    width: "50%"
  }
})