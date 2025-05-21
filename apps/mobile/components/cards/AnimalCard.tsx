import { View, StyleSheet, Text } from "react-native";
import Badge from "../Badge";
import { gender } from "../../../../packages/shared/enums";
import { IAnimal } from "../../../../packages/shared/models";
import { toReadableGender } from "../../../../packages/shared/utils/toReadableGender";
import { toReadableAnimalType } from "../../../../packages/shared/utils/toReadableAnimalType";
import { useBarnStore } from "@/stores/useBarnStore";

export default function AnimalCard({
  animal
}: {
  animal: IAnimal
}) {
  const { allBarns } = useBarnStore()
  
  return <View style={styles.card}>
    <View style={styles.contentRow}>
      <Text style={styles.contentLabel}>İsim</Text>
      <Text style={styles.contentValue}>{animal.name || "-"}</Text>
    </View>
    <View style={styles.contentRow}>
      <Text style={styles.contentLabel}>Kulak Numarası</Text>
      <Text style={styles.contentValue}>{animal.earring || "-"}</Text>
    </View>
    <View style={styles.contentRow}>
      <View style={styles.contentCell}>
        <Text style={styles.contentLabel}>Tür</Text>
        <Text style={styles.contentValue}>{toReadableAnimalType[animal.type] || "-"}</Text>
      </View>
      <View style={styles.contentCell}>
        <Text style={styles.contentLabel}>Cins</Text>
        <Text style={styles.contentValue}>{animal.genus || "-"}</Text>
      </View>
    </View>
    <View style={styles.contentRow}>
      <Text style={styles.contentLabel}>Ağırlık</Text>
      <Text style={styles.contentValue}>{animal.weight || "-"}</Text>
    </View>
    <View style={styles.contentRow}>
      <Text style={styles.contentLabel}>Doğum Tarihi</Text>
      <Text style={styles.contentValue}>{animal.birthday.format("DD/MM/YYYY") || "-"}</Text>
    </View>
    <View style={styles.contentRow}>
      <View style={styles.contentCell}>
        <Text style={styles.contentLabel}>Cinsiyet</Text>
        <View style={styles.contentBadge}><Badge label={toReadableGender[animal.gender]} value={animal.gender} /></View>
      </View>
      {
        animal.gender === gender.female &&
        (
          <View style={styles.contentCell}>
            <Text style={styles.contentLabel}>Hamilelik</Text>
            <View style={styles.contentBadge}>{
              animal.isPregnant ?
                (<Badge label="Hamile" value={"PREGNANT"} />) :
                <Text style={styles.contentValue}>-</Text>
            }</View>
          </View>
        )
      }
    </View>
    <View style={styles.contentRow}>
      <Text style={styles.contentLabel}>Ağıl</Text>
      <Text style={styles.contentValue}>{allBarns?.find((barn) => barn.id == animal.barnName)?.name || "-"}</Text>
    </View>
  </View>
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    padding: 6,
    borderRadius: 12,
    borderColor: "#e5e7eb",
    display: "flex",
    flexDirection: "column",
    gap: 4
  },
  contentLabel: {
    fontSize: 16,
    color: "#6a7282"
  },
  contentValue: {
    fontSize: 16,
    paddingLeft: 6
  },
  contentRow: {
    display: "flex",
    flexDirection: "row"
  },
  contentBadge: {
    paddingLeft: 6
  },
  contentCell: {
    width: "50%",
    display: "flex",
    flexDirection: "row"
  }
})