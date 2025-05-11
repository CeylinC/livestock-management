import Input from "@/components/Input";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Image, Dimensions } from "react-native";
import { useUserStore } from "@/stores/useUserStore"
import { supabase } from "@/utils/supabaseClient";
import Button from "@/components/Button";
import { User } from "../../../packages/shared/classes/User";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get('window');

export default function Signup() {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const { createUser } = useUserStore()

  const signUpWithEmail = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    } else {
      createUser(new User({ email, password, username }))
      router.push("/(tabs)")
    }

    return data;
  };

  const routeLogin = () => {
    router.push("/login")
  }

  return <View>
    <LinearGradient
      colors={['#0A8270', '#7CFF6B']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradient}
    >
      <Image
        source={require('../assets/images/signup.jpg')}
        style={styles.image}
        resizeMode="cover"
      />
    </LinearGradient>
    <View style={styles.container}>
      <Text style={styles.title}>Merhabalar, Hoşgeldin!</Text>
      <Input name="email" label="Email" onChange={(value) => setEmail(value)} />
      <Input name="username" label="Kullanıcı Adı" onChange={(value) => setUsername(value)} />
      <Input name="password" label="Şifre" onChange={(value) => setPassword(value)} secureTextEntry/>
      <Button label="Üye Ol" onPress={() => signUpWithEmail(email, password)} />
      <TouchableOpacity onPress={routeLogin}><Text>Hesabın var mı? Giriş yap</Text></TouchableOpacity>
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
  }
});