"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { supabase } from "@/utils/supabaseClient";
import { useState } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "next/navigation";
import loginImage from "../../../public/login.jpg";
import { toReadableAuthErrors } from "../../../../../packages/shared/utils/toReadableAuthErrors";

type AuthErrorKey = keyof typeof toReadableAuthErrors;

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  const { getUser } = useUserStore()
  const router = useRouter()

  const signInWithEmail = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.code || "unknown_error");
    } else {
      getUser(email)
      router.push("/dashboard")
    }

    return data;
  };

  return <div className="w-full h-screen flex justify-end"
    style={{
      backgroundImage: `linear-gradient(to top right, #0A8270cc, #7CFF6B99), url(${loginImage.src})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div className="w-[400px] bg-white p-8 rounded-md flex flex-col gap-6 items-center justify-center">
      <div className="font-bold text-lg">Tekrar Hoşgeldin!</div>
      <div className="flex flex-col gap-4 w-full">
        <Input name="email" label="Email" onChange={(value) => setEmail(value)} />
        <Input name="password" label="Password" type="password" onChange={(value) => setPassword(value)} />
      </div>
      {error && <div className="text-red-500 text-sm">{toReadableAuthErrors[error as AuthErrorKey]}</div>}
      <Button label="Giriş Yap" onClick={() => signInWithEmail(email, password)} />
      <div onClick={() => router.push("/signup")}>Hesabın yok mu? Üye ol</div>
    </div>
  </div>
}