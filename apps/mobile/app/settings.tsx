import { StyleSheet, Text } from 'react-native';

import Layout from '@/components/Layout';
import { supabase } from '@/utils/supabaseClient';
import { useUserStore } from '../../../packages/shared/stores/useUserStore';
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
      <Text>Setting</Text>
      <Button label="Çıkış Yap" onPress={signOut} />
    </Layout>
  );
}
