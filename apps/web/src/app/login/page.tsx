"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { supabase } from "@/utils/supabaseClient";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const signInWithEmail = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  return <div className="w-full h-screen bg-gradient-to-tr from-[#0A8270] to-[#7CFF6B] flex justify-center items-center">
    <div className="bg-white p-8 rounded-md flex flex-col gap-6">
      Giriş yap
      <div className="flex flex-col gap-4">
        <Input name="email" label="Email" onChange={(value) => setEmail(value)} />
        <Input name="password" label="Password" onChange={(value) => setPassword(value)} />
      </div>
      <Button label="Giriş Yap" onClick={() => signInWithEmail(email, password)} />
    </div>
  </div>
}