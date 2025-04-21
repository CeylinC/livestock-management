import { create } from "zustand"
import { IAnimal } from "../models"
import { Animal } from "../classes"
import mockData from "../mocks/animals.json"
import { webPageSize } from "../constant/pageSize";
import { gender } from "../enums";
import { animalTypes } from "../enums/animalTypes";

interface AnimalState {
  animals: IAnimal[] | null
  selectedAnimal: IAnimal | null
  filters: {type: animalTypes | null, gender: gender | null, barn: string | null}
  getAnimals: (pageNumber: number) => void
  selectAnimal: (animal: IAnimal | null) => void
  setFilters: (value: {type: animalTypes | null, gender: gender | null, barn: string | null}) => void
}

export const useAnimalStore = create<AnimalState>((set, get) => ({
  animals: null,
  selectedAnimal: null,
  filters: {type: null, gender: null, barn: null},
  getAnimals: (pageNumber) => {
    const temp = mockData.slice((pageNumber - 1) * webPageSize, pageNumber * webPageSize)
    set(() => ({
      animals: temp.map((animal) => new Animal(animal))
    }))
  },
  selectAnimal: (animal) => {
    set(() => ({selectedAnimal: animal}))
  },
  setFilters: (value) => set({filters: value})
}))