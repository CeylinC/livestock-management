import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout({
  children
}: {
  children?: ReactNode
}) {
  return <LinearGradient
      colors={['#0A8270', '#7CFF6B']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradient}

    >
      <SafeAreaView style={styles.background}>
        <View style={styles.topContent}>
          <View>
            <Text style={styles.welcomeText}>Hoşgeldin</Text>
            <Text style={styles.usernameText}>Ceylin</Text>
          </View>
          <View>
            <Text>S</Text>
          </View>
        </View>
        <ScrollView style={styles.content}>
          {children}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  content: {
    backgroundColor: "white",
    borderTopStartRadius: 32,
    borderTopEndRadius: 32,
    paddingVertical: 24,
    paddingHorizontal: 16
  },
  topContent: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  welcomeText: {
    color: "white"
  },
  usernameText: {
    color: "white",
    fontSize: 24
  }
});