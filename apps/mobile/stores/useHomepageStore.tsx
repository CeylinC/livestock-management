import { supabase } from "@/utils/supabaseClient"
import { create } from "zustand"
import { animalTypes } from "../../../packages/shared/enums/animalTypes"

type GenderCount = {
  MALE: number
  FEMALE: number
}

type AnimalsByType = {
  [key in animalTypes]: GenderCount
}

type BarnGenderCount = {
  MALE: number
  FEMALE: number
  KARMA: number
}

type BarnsByType = {
  [key in animalTypes]: BarnGenderCount
}

interface HomepageState {
  totalAnimal: number
  totalBarn: number
  animals: AnimalsByType | null
  barns: BarnsByType | null
  getHomepageData: (userId: string) => void
  getTotalAnimal: (userId: string) => void
  getTotalBarn: (userId: string) => void
  getAnimalsByTypeAndGender: (userId: string) => void
  getBarnsByTypeAndGender: (userId: string) => Promise<void>
}

export const useHomepageStore = create<HomepageState>((set, get) => ({
  totalAnimal: 0,
  totalBarn: 0,
  animals: null,
  barns: null,
  getHomepageData: async (userId) => {
    const { getAnimalsByTypeAndGender, getBarnsByTypeAndGender, getTotalAnimal, getTotalBarn } = get()

    try {
      await Promise.all([
        getAnimalsByTypeAndGender(userId),
        getBarnsByTypeAndGender(userId),
        getTotalAnimal(userId),
        getTotalBarn(userId)
      ])

      console.log('All data fetched successfully')

    } catch (error) {
      console.error("Error fetching homepage data:", error)
    }
  },
  getTotalAnimal: async (userId) => {
    const { data, error } = await supabase
      .from("animals")
      .select("*", { count: "exact" })
      .eq("user_id", userId)

    if (error) {
      console.error("Error fetching animals:", error)
      return
    }

    set({ totalAnimal: data.length })
  },
  getTotalBarn: async (userId) => {
    const { data, error } = await supabase
      .from("barns")
      .select("*", { count: "exact" })
      .eq("user_id", userId)

    if (error) {
      console.error("Error fetching barns:", error)
      return
    }

    set({ totalBarn: data.length })
  },
  getAnimalsByTypeAndGender: async (userId) => {
    const updatedAnimals: Partial<AnimalsByType> = {}

    for (const typeKey in animalTypes) {
      const type = animalTypes[typeKey as keyof typeof animalTypes]

      const { count: maleCount, error: maleError } = await supabase
        .from("animals")
        .select("*", { count: "exact", head: true })
        .eq("user_id", userId)
        .eq("type", type)
        .eq("gender", "MALE")

      const { count: femaleCount, error: femaleError } = await supabase
        .from("animals")
        .select("*", { count: "exact", head: true })
        .eq("user_id", userId)
        .eq("type", type)
        .eq("gender", "FEMALE")

      if (maleError || femaleError) {
        console.error(`❌ Error fetching ${type} data:`, maleError || femaleError)
        continue
      }

      updatedAnimals[type] = {
        MALE: maleCount ?? 0,
        FEMALE: femaleCount ?? 0
      }
    }

    if (Object.keys(updatedAnimals).length === 0) {
      set({ animals: null })
    } else {
      set({ animals: updatedAnimals as AnimalsByType })
    }
  },
  getBarnsByTypeAndGender: async (userId) => {
    const updatedBarns: Partial<BarnsByType> = {}

    for (const typeKey in animalTypes) {
      const type = animalTypes[typeKey as keyof typeof animalTypes]

      const fetchCount = async (gender: "MALE" | "FEMALE" | "KARMA") => {
        const { count, error } = await supabase
          .from("barns")
          .select("*", { count: "exact", head: true })
          .eq("user_id", userId)
          .eq("type", type)
          .eq("gender", gender)

        if (error) {
          console.error(`Error fetching barns for ${type} - ${gender}:`, error)
          return 0
        }

        return count ?? 0
      }

      const male = await fetchCount("MALE")
      const female = await fetchCount("FEMALE")
      const karma = await fetchCount("KARMA")

      updatedBarns[type] = {
        MALE: male,
        FEMALE: female,
        KARMA: karma
      }
    }

    if (Object.keys(updatedBarns).length === 0) {
      set({ barns: null })
    } else {
      set({ barns: updatedBarns as BarnsByType })
    }
  }
}))