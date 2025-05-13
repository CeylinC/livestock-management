'use client'

import Button from "@/components/Button";
import { supabase } from "@/utils/supabaseClient";
import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const { clearUser } = useUserStore()
  const router = useRouter()

  
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
    clearUser()
    router.push("/login")
  };
  
  return (
    <div>
      <div className="font-bold text-2xl">Ayarlar</div>
      <div className="w-80 mt-4">
      <Button label="Çıkış Yap" onClick={signOut} variant="danger"/>
      </div>
    </div>
  );
}