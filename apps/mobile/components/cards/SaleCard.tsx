import { View, StyleSheet, Text } from "react-native";
import Badge from "../Badge";
import { ISale } from "../../../../packages/shared/models";
import { toReadableSalesCategories } from "../../../../packages/shared/utils/toReadableSalesCategories";
import { toReadablePaymentState } from "../../../../packages/shared/utils/toReadablePaymentState";

export default function SaleCard({
  sale
}: {
  sale: ISale
}) {
  return <View style={styles.card}>
    <View style={styles.contentRow}>
      <Text style={styles.contentLabel}>İsim</Text>
      <Text style={styles.contentValue}>{sale.name || "-"}</Text>
    </View>
    <View style={styles.contentRow}>
      <Text style={styles.contentLabel}>Kategori</Text>
      <View style={styles.contentBadge}><Badge label={toReadableSalesCategories[sale.category]} value={sale.category} /></View>
    </View>
    <View style={styles.contentRow}>
      <Text style={styles.contentLabel}>Miktar</Text>
      <Text style={styles.contentValue}>{sale.amount || "-"}</Text>
    </View>
    <View style={styles.contentRow}>
      <Text style={styles.contentLabel}>Ücret</Text>
      <Text style={styles.contentValue}>{sale.price || "-"}</Text>
    </View>
    <View style={styles.contentRow}>
      <Text style={styles.contentLabel}>Satış Tarihi</Text>
      <Text style={styles.contentValue}>{sale.saleDate.format("DD/MM/YYYY") || "-"}</Text>
    </View>
    <View style={styles.contentRow}>
      <Text style={styles.contentLabel}>Alıcı İsmi</Text>
      <Text style={styles.contentValue}>{sale.recipientName || "-"}</Text>
    </View>
    <View style={styles.contentRow}>
      <Text style={styles.contentLabel}>İletişim</Text>
      <Text style={styles.contentValue}>{sale.contact || "-"}</Text>
    </View>
    <View style={styles.contentRow}>
      <View style={styles.contentCell}>
        <Text style={styles.contentLabel}>Ödeme Durumu</Text>
        <Text style={styles.contentValue}>{toReadablePaymentState[sale.paymentState] || "-"}</Text>
      </View>
      <View style={styles.contentCell}>
        <Text style={styles.contentLabel}>Ödeme Tarihi</Text>
        <Text style={styles.contentValue}>{sale.paymentDate.format("DD/MM/YYYY") || "-"}</Text>
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