import { create } from "zustand"
import { IAnimal } from "../models"
import { Animal } from "../classes"
import { webPageSize } from "../constant/pageSize";
import { gender } from "../enums";
import { animalTypes } from "../enums/animalTypes";
import { supabase } from "../utils/supabaseClient";

interface AnimalState {
  animals: IAnimal[] | null
  selectedAnimal: IAnimal | null
  filters: { type: animalTypes | null, gender: gender | null, barn: string | null }
  animalCount: number
  getAnimals: (userId: string, pageNumber: number) => void
  getAnimalCount: (userID: string) => void
  selectAnimal: (animal: IAnimal | null) => void
  setFilters: (value: { type: animalTypes | null, gender: gender | null, barn: string | null }) => void
  addAnimal: (userId: string, animal: IAnimal) => void
}

export const useAnimalStore = create<AnimalState>((set, get) => ({
  animals: null,
  selectedAnimal: null,
  filters: { type: null, gender: null, barn: null },
  animalCount: 0,
  getAnimals: async (userId, pageNumber) => {
    const { data, error } = await supabase
      .from('animals')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range((pageNumber - 1) * 10, pageNumber * 10 - 1);

    set(() => ({ animals: data ? data.map((animal => new Animal(animal))) : null }))
  },
  getAnimalCount: async (userID) => {
    const { count } = await supabase
      .from('animals')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userID);

    if (count && count >= 0) {
      console.log(count)
      set(() => ({ animalCount: count }))
    }
  },
  selectAnimal: (animal) => {
    set(() => ({ selectedAnimal: animal }))
  },
  setFilters: (value) => set({ filters: value }),
  addAnimal: async (userId, animal) => {
    const { data, error } = await supabase
      .from('animals')
      .insert([{
        user_id: userId,
        name: animal.name,
        earring: animal.earring,
        type: animal.type,
        genus: animal.genus,
        gender: animal.gender,
        birthday: animal.birthday.toDate(),
        weight: animal.weight,
        is_pregnant: animal.isPregnant,
        barn: animal.barnName
      }])
      .select()
      .single()

    set((state) => ({ animals: state.animals ? [new Animal(data), ...state.animals] : [new Animal(data)] }))
  }
}))