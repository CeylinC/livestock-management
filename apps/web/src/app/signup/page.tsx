"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { supabase } from "@/utils/supabaseClient";
import { useState } from "react";
import { useUserStore } from '../../../../../packages/shared/stores/useUserStore'
import { User } from '../../../../../packages/shared/classes/User'
import { useRouter } from "next/navigation";

export default function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")

  const { createUser } = useUserStore()
  const router = useRouter()

  const signUpWithEmail = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    } else {
      createUser(new User({ email, password, username }))
      router.push("/dashboard")
    }
    return data;
  };


  return <div className="w-full h-screen bg-gradient-to-tr from-[#0A8270] to-[#7CFF6B] flex justify-center items-center">
    <div className="bg-white p-8 rounded-md flex flex-col gap-6">
      Üye ol
      <div className="flex flex-col gap-4">
        <Input name="email" label="Email" onChange={(value) => setEmail(value)} />
        <Input name="userName" label="Kullanıcı Adı" onChange={(value) => setUsername(value)} />
        <Input name="password" label="Password" onChange={(value) => setPassword(value)} />
      </div>
      <Button label="Üye ol" onClick={() => signUpWithEmail(email, password)} />
    </div>
  </div>
}