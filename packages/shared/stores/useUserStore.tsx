import { create } from "zustand"
import { IUser } from "../models/IUser"
import { User } from "../classes/User";
import { supabase } from "@/utils/supabaseClient";

interface UserState {
  user: IUser | null
  createUser: (user: IUser) => void
  getUser: (email: string) => void
  clearUser: () => void
}

export const useUserStore = create<UserState>((set, get) => ({
  user: new User(),
  createUser: async (user) => {
    const { data } = await supabase.from('tenant_users').insert([
      {
        username: user.username,
        email: user.email,
      },
    ])
      .select();

    set(() => ({ user: new User(data) }))
  },
  getUser: async (email) => {
    const {user} = get()
    const { data } = await supabase
      .from('tenant_users')
      .select('*')
      .eq('email', email)
      .single();
      
      set(() => ({ user: new User(data)}))
  },
  clearUser: () => set(() => ({user: new User()}))
}))