import { View, StyleSheet, Text } from "react-native";
import Badge from "../Badge";
import { gender, saleCategory } from "../../../../packages/shared/enums";
import { IStock } from "../../../../packages/shared/models";
import { toReadableSalesCategories } from "../../../../packages/shared/utils/toReadableSalesCategories";

export default function StockCard({
  stock
}: {
  stock: IStock
}) {
    return <View style={styles.card}>
      <View style={styles.contentRow}>
        <Text style={styles.contentLabel}>İsim</Text>
        <Text style={styles.contentValue}>{stock.name || "-"}</Text>
      </View>
      <View style={styles.contentRow}>
        <Text style={styles.contentLabel}>Kategori</Text>
        <View style={styles.contentBadge}><Badge label={toReadableSalesCategories[stock.category]} value={stock.category}/></View>
      </View>
      <View style={styles.contentRow}>
        <Text style={styles.contentLabel}>Miktar</Text>
        <Text style={styles.contentValue}>{stock.amount || "-"}</Text>
      </View>
      <View style={styles.contentRow}>
        <Text style={styles.contentLabel}>Satıcı</Text>
        <Text style={styles.contentValue}>{stock.dealer || "-"}</Text>
      </View>
      <View style={styles.contentRow}>
        <Text style={styles.contentLabel}>Stok Yeri</Text>
        <Text style={styles.contentValue}>{stock.storage || "-"}</Text>
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