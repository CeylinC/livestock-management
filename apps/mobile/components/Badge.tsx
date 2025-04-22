import { View, StyleSheet, Text } from "react-native";
import { BadgeColors } from "../../../packages/shared/constant/badgeColors"

export default function Badge({
  value,
  label
}: {
  value?: keyof typeof BadgeColors
  label: string
}) {
  return <View style={
    {
      ...styles.badgeContainer,
      backgroundColor: value ? BadgeColors[value].bg : "#fefefe",
    }
  }>
    <Text style={{
      ...styles.badgeText,
      color: value ? BadgeColors[value].text : "black"
    }}>
      {label}
    </Text>
  </View>
}

const styles = StyleSheet.create({
  badgeContainer: {
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2
  },
  badgeText: {
    textAlign: "center"
  }
})