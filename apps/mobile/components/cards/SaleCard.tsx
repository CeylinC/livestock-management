import { View, StyleSheet, Text } from "react-native";
import Badge from "../Badge";
import { gender } from "../../../../packages/shared/enums";

export default function SaleCard() {
  return <View style={styles.card}>
    <View style={styles.contentRow}>
      <Text style={styles.contentLabel}>İsim</Text>
      <Text style={styles.contentValue}>İsim</Text>
    </View>
    <View style={styles.contentRow}>
      <Text style={styles.contentLabel}>Kategori</Text>
      <View style={styles.contentBadge}><Badge label="Dişi" value={gender.female} /></View>
    </View>
    <View style={styles.contentRow}>
      <Text style={styles.contentLabel}>Miktar</Text>
      <Text style={styles.contentValue}>İsim</Text>
    </View>
    <View style={styles.contentRow}>
      <Text style={styles.contentLabel}>Ücret</Text>
      <Text style={styles.contentValue}>İsim</Text>
    </View>
    <View style={styles.contentRow}>
      <Text style={styles.contentLabel}>Satış Tarihi</Text>
      <Text style={styles.contentValue}>İsim</Text>
    </View>
    <View style={styles.contentRow}>
      <View style={styles.contentCell}>
        <Text style={styles.contentLabel}>Alıcı İsmi</Text>
        <Text style={styles.contentValue}>İsim</Text>
      </View>
      <View style={styles.contentCell}>
        <Text style={styles.contentLabel}>İletişim</Text>
        <Text style={styles.contentValue}>İsim</Text>
      </View>
    </View>
    <View style={styles.contentRow}>
      <View style={styles.contentCell}>
        <Text style={styles.contentLabel}>Ödeme Durumu</Text>
        <Text style={styles.contentValue}>İsim</Text>
      </View>
      <View style={styles.contentCell}>
        <Text style={styles.contentLabel}>Ödeme Tarihi</Text>
        <Text style={styles.contentValue}>İsim</Text>
      </View>
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