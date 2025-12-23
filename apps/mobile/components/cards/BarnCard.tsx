import { View, StyleSheet, Text } from "react-native";
import Badge from "../Badge";
import { IBarn } from "../../../../packages/shared/models";
import { toReadableAnimalType } from "../../../../packages/shared/utils/toReadableAnimalType";
import { toReadableGender } from "../../../../packages/shared/utils/toReadableGender";
import dayjs from "dayjs";

export default function BarnCard({ barn }: { barn: IBarn }) {
  return (
    <View style={styles.card}>
      <View style={styles.contentRow}>
        <Text style={styles.contentLabel}>İsim</Text>
        <Text style={styles.contentValue}>{barn.name || "-"}</Text>
      </View>
      <View style={styles.contentRow}>
        <View style={styles.contentCell}>
          <Text style={styles.contentLabel}>Tür</Text>
          <Text style={styles.contentValue}>
            {toReadableAnimalType[barn.type]}
          </Text>
        </View>
        <View style={styles.contentCell}>
          <Text style={styles.contentLabel}>Cinsiyet</Text>
          <View style={styles.contentBadge}>
            <Badge label={toReadableGender[barn.gender]} value={barn.gender} />
          </View>
        </View>
      </View>
      <View style={styles.contentRow}>
        <View style={styles.contentCell}>
          <Text style={styles.contentLabel}>Su var mı</Text>
          <Text style={styles.contentValue}>
            {barn.sensorData?.water !== undefined
              ? barn.sensorData.water
                ? "Var"
                : "Yok"
              : "-"}
          </Text>
        </View>
        <View style={styles.contentCell}>
          <Text style={styles.contentLabel}>Yem ağırlığı</Text>
          <Text style={styles.contentValue}>
            {barn.sensorData?.weight !== undefined
              ? barn.sensorData.weight
              : "-"}
          </Text>
        </View>
      </View>
      <View style={styles.contentRow}>
        <View style={styles.contentCell}>
          <Text style={styles.contentLabel}>Nem</Text>
          <Text style={styles.contentValue}>
            {barn.sensorData?.humidity !== undefined
              ? barn.sensorData.humidity
              : "-"}
          </Text>
        </View>
        <View style={styles.contentCell}>
          <Text style={styles.contentLabel}>Sıcaklık</Text>
          <Text style={styles.contentValue}>
            {barn.sensorData?.temperature !== undefined
              ? barn.sensorData.temperature
              : "-"}
          </Text>
        </View>
      </View>
      <View style={styles.contentRow}>
        <Text style={styles.contentLabel}>Yollama tarihi</Text>
        <Text style={styles.contentValue}>
          {barn.sensorData?.createdAt
            ? dayjs(barn.sensorData.createdAt).format("DD.MM.YYYY HH:mm")
            : "-"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    padding: 6,
    borderRadius: 12,
    borderColor: "#e5e7eb",
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  contentLabel: {
    fontSize: 16,
    color: "#6a7282",
  },
  contentValue: {
    fontSize: 16,
    paddingLeft: 6,
  },
  contentRow: {
    display: "flex",
    flexDirection: "row",
  },
  contentBadge: {
    paddingLeft: 6,
  },
  contentCell: {
    width: "50%",
    display: "flex",
    flexDirection: "row",
  },
});
