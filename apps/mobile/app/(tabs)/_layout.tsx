import { router, Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { supabase } from '@/utils/supabaseClient';
import { useUserStore } from '@/stores/useUserStore';
import LivestockIcon from '@/assets/icons/livestock';
import BarnIcon from '@/assets/icons/barn';
import StockIcon from '@/assets/icons/stock';
import SaleIcon from '@/assets/icons/sale';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const {user, getUser} = useUserStore()

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data?.session) {
        router.push("/login");
      } else {
        if(!user?.id && data.session.user.email) {
          getUser(data.session?.user.email)
        }
      }
    };

    getCurrentUser();
  }, [router]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Anasayfa',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house" color={color} />,
        }}
      />
      <Tabs.Screen
        name="animals"
        options={{
          title: 'Hayvanlar',
          tabBarIcon: ({ color }) => <LivestockIcon fill={color} />,
        }}
      />
      <Tabs.Screen
        name="barns"
        options={{
          title: 'Ağıllar',
          tabBarIcon: ({ color }) => <BarnIcon stroke={color} />,
        }}
      />
      <Tabs.Screen
        name="stocks"
        options={{
          title: 'Stoklar',
          tabBarIcon: ({ color }) => <StockIcon fill={color} />,
        }}
      />
      <Tabs.Screen
        name="sales"
        options={{
          title: 'Satışlar',
          tabBarIcon: ({ color }) => <SaleIcon fill={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          href: null
        }}
      />
    </Tabs>
  );
}
