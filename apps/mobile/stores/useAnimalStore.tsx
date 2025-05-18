import { create } from "zustand"
import { IAnimal } from "../../../packages/shared/models"
import { Animal } from "../../../packages/shared/classes"
import { gender } from "../../../packages/shared/enums";
import { animalTypes } from "../../../packages/shared/enums/animalTypes";
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
  updateAnimal: (userId: string, animal: IAnimal) => void
  deleteAnimal: (userId: string, animalId: string) => void
}

export const useAnimalStore = create<AnimalState>((set, get) => ({
  animals: null,
  selectedAnimal: null,
  filters: { type: null, gender: null, barn: null },
  animalCount: 0,
  getAnimals: async (userId, pageNumber) => {
    const { filters } = get()
    let query = supabase
      .from('animals')
      .select('*')
      .eq('user_id', userId)

    if (filters.type) {
      query = query.eq('type', filters.type)
    }

    if (filters.gender) {
      query = query.eq('gender', filters.gender)
    }

    if (filters.barn) {
      query = query.eq('barn', filters.barn)
    }

    query = query
      .order('created_at', { ascending: false })
      .range((pageNumber - 1) * 10, pageNumber * 10 - 1)

    const { data, error } = await query

    set(() => ({ animals: data ? data.map(animal => new Animal(animal)) : null }))
  },
  getAnimalCount: async (userID) => {
    const { filters } = get()
  
    let query = supabase
      .from('animals')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userID)
  
    if (filters.type) {
      query = query.eq('type', filters.type)
    }
  
    if (filters.gender) {
      query = query.eq('gender', filters.gender)
    }
  
    if (filters.barn) {
      query = query.eq('barn', filters.barn)
    }
  
    const { count } = await query
  
    if (count !== null && count >= 0) {
      set(() => ({ animalCount: count }))
    }
  }, 
  selectAnimal: (animal) => {
    set(() => ({ selectedAnimal: animal }))
  },
  setFilters: (value) => set({ filters: value }),
  addAnimal: async (userId, animal) => {
    const { data } = await supabase
      .from('animals')
      .insert([{
        user_id: userId,
        name: animal.name,
        earring: animal.earring,
        type: animal.type,
        genus: animal.genus,
        gender: animal.gender,
        birthday: animal.birthday.format("YYYY-MM-DD"),
        weight: animal.weight,
        is_pregnant: animal.isPregnant,
        barn: animal.barnName
      }])
      .select()
      .single()

    set((state) => ({ animals: state.animals ? [new Animal(data), ...state.animals].slice(0, -1) : [new Animal(data)] }))
  },
  updateAnimal: async (userId, animal) => {
    const { data } = await supabase
      .from('animals')
      .update({
        name: animal.name,
        earring: animal.earring,
        type: animal.type,
        genus: animal.genus,
        gender: animal.gender,
        birthday: animal.birthday.format("YYYY-MM-DD"),
        weight: animal.weight,
        is_pregnant: animal.isPregnant,
        barn: animal.barnName
      })
      .eq('id', animal.id)
      .eq('user_id', userId)
      .select()
      .single();
  
    set((state) => ({
      animals: state.animals
        ? state.animals.map((a) => a.id === animal.id ? new Animal(data) : a)
        : []
    }));
  },
  deleteAnimal: async (userId, animalId) => {
    const { error } = await supabase
      .from('animals')
      .delete()
      .eq('id', animalId)
      .eq('user_id', userId);
  
    if (!error) {
      set((state) => ({
        animals: state.animals
          ? state.animals.filter(animal => animal.id !== animalId)
          : []
      }));
    }
  }
  
}))