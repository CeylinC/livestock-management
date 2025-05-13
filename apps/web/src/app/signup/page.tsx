"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { supabase } from "@/utils/supabaseClient";
import { useState } from "react";
import { useUserStore } from '@/stores/useUserStore'
import { User } from '../../../../../packages/shared/classes/User'
import { useRouter } from "next/navigation";
import signupImage from "../../../public/signup.jpg";

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


  return <div className="w-full h-screen flex justify-start"
        style={{
          backgroundImage: `linear-gradient(to top right, #0A8270cc, #7CFF6B99), url(${signupImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
    <div className="bg-white p-8 rounded-md flex flex-col gap-6 h-full items-center justify-center">
      <div className="font-bold text-lg">Merhaba, Hoşgeldin!</div>
      <div className="flex flex-col gap-4">
        <Input name="email" label="Email" onChange={(value) => setEmail(value)} />
        <Input name="userName" label="Kullanıcı Adı" onChange={(value) => setUsername(value)} />
        <Input name="password" label="Password" onChange={(value) => setPassword(value)} />
      </div>
      <Button label="Üye ol" onClick={() => signUpWithEmail(email, password)} />
      <div onClick={() => router.push("/login")}>Hesabın var mı? Giriş Yap</div>
    </div>
  </div>
}