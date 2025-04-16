import { create } from "zustand"
import { IAnimal } from "../models"
import { Animal } from "../classes"
import mockData from "../mocks/animals.json"
import { webPageSize } from "../constant/pageSize";

interface AnimalState {
  animals: IAnimal[] | null
  selectedAnimal: IAnimal | null
  getAnimals: (pageNumber: number) => void
  selectAnimal: (animal: IAnimal | null) => void
}

export const useAnimalStore = create<AnimalState>((set, get) => ({
  animals: null,
  selectedAnimal: null,
  getAnimals: (pageNumber) => {
    const temp = mockData.slice((pageNumber - 1) * webPageSize, pageNumber * webPageSize)
    set(() => ({
      animals: temp.map((animal) => new Animal(animal))
    }))
  },
  selectAnimal: (animal) => {
    set(() => ({selectedAnimal: animal}))
  }
}))