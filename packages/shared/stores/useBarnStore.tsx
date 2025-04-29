import { create } from "zustand"
import { IBarn } from "../models"
import { Barn } from "../classes"
import { webPageSize } from "../constant/pageSize";
import { gender } from "../enums";
import { animalTypes } from "../enums/animalTypes";
import { supabase } from "../utils/supabaseClient";

interface BarnState {
  barns: IBarn[] | null
  selectedBarn: IBarn | null
  filters: { type: animalTypes | null, gender: gender | null }
  barnCount: number
  getBarns: (userId: string, pageNumber: number) => void
  selectBarn: (animal: IBarn | null) => void
  setFilters: (value: { type: animalTypes | null, gender: gender | null }) => void
  getBarnCount: (userID: string) => void
  addBarn: (userId: string, barn: IBarn) => void
}

export const useBarnStore = create<BarnState>((set, get) => ({
  barns: null,
  selectedBarn: null,
  filters: { type: null, gender: null },
  barnCount: 0,
  getBarns: async (userId, pageNumber) => {
    const { data, error } = await supabase
      .from('barns')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range((pageNumber - 1) * 10, pageNumber * 10 - 1);

    set(() => ({ barns: data ? data.map((barn => new Barn(barn))) : null }))
  },
  selectBarn: (barn) => {
    set(() => ({ selectedBarn: barn }))
  },
  setFilters: (value) => set({ filters: value }),
  getBarnCount: async (userID) => {
    const { count } = await supabase
      .from('barns')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userID);

    if (count && count >= 0) {
      set(() => ({ barnCount: count }))
    }
  },
  addBarn: async (userId, barn) => {
    const { data, error } = await supabase
      .from('barns')
      .insert([{
        user_id: userId,
        name: barn.name,
        type: barn.type,
        gender: barn.gender
      }])
      .select()
      .single()

    set((state) => ({ barns: state.barns ? [new Barn(data), ...state.barns].slice(0, -1) : [new Barn(data)] }))
  }
}))