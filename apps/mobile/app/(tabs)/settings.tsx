import { StyleSheet, Text } from 'react-native';

import Layout from '@/components/Layout';
import { supabase } from '@/utils/supabaseClient';
import { useUserStore } from '@/stores/useUserStore';
import { router } from 'expo-router';
import Button from '@/components/Button';

export default function SettingsScreen() {
  const { clearUser } = useUserStore()

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
    clearUser()
    router.push("/login")
  };

  return (
    <Layout>
      <Text style={styles.title}>Ayarlar</Text>
      <Button label="Çıkış Yap" onPress={signOut} variant='danger'/>
    </Layout>
  );
}
const styles = StyleSheet.create({
  title: {
    fontWeight: "600",
    fontSize: 24,
    marginBottom: 8
  },
})