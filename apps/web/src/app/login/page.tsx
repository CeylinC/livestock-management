"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";

export default function Login() {
  return <div className="w-full h-screen bg-gradient-to-tr from-[#0A8270] to-[#7CFF6B] flex justify-center items-center">
    <div className="bg-white p-8 rounded-md flex flex-col gap-6">
      Giriş yap
      <div className="flex flex-col gap-4">
        <Input name="email" label="Email" onChange={() => { }} />
        <Input name="password" label="Password" onChange={() => { }} />
      </div>
      <Button label="Giriş Yap" onClick={() => {}}/>
    </div>
  </div>
}