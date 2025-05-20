import Input from "@/components/Input";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View, Image, StyleSheet, Dimensions } from "react-native";
import { useUserStore } from "@/stores/useUserStore"
import { supabase } from "@/utils/supabaseClient";
import Button from "@/components/Button";
import { LinearGradient } from "expo-linear-gradient";
import { toReadableAuthErrors } from "../../../packages/shared/utils/toReadableAuthErrors";

const { width } = Dimensions.get('window');
type AuthErrorKey = keyof typeof toReadableAuthErrors;

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  const { getUser } = useUserStore()

  const signInWithEmail = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.code || "unknown_error");
    } else {
      await getUser(email)
      router.push("/(tabs)")
    }

    return data;
  };

  const routeLogin = () => {
    router.push("/signup")
  }

  return <View>
    <LinearGradient
      colors={['#0A8270', '#7CFF6B']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradient}
    >
      <Image
        source={require('../assets/images/login.jpg')}
        style={styles.image}
        resizeMode="cover"
      />
    </LinearGradient>
    <View style={styles.container}>
      <Text style={styles.title}>Tekrar Hoşgeldin!</Text>
      <Input name="email" label="Email" onChange={(value) => setEmail(value)} />
      <Input name="password" label="Şifre" onChange={(value) => setPassword(value)} secureTextEntry />
      {error && <Text style={styles.errorText}>{toReadableAuthErrors[error as AuthErrorKey]}</Text>}
      <Button label="Giriş Yap" onPress={() => signInWithEmail(email, password)} />
      <TouchableOpacity onPress={routeLogin}><Text>Hesabın yok mu? Üye ol</Text></TouchableOpacity>
    </View>
  </View>
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 32,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16
  },
  title: {
    fontSize: 24
  },
  gradient: {
    width: "auto",
    height: 300
  },
  image: {
    width: width,
    height: 300,
    opacity: 0.3
  },
  errorText: {
    color: "red",
    fontSize: 14,
  }
});