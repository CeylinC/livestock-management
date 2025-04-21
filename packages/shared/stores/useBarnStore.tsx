import { create } from "zustand"
import { IBarn } from "../models"
import { Barn } from "../classes"
import mockData from "../mocks/barns.json"
import { webPageSize } from "../constant/pageSize";
import { gender } from "../enums";
import { animalTypes } from "../enums/animalTypes";

interface BarnState {
  barns: IBarn[] | null
  selectedBarn: IBarn | null
  filters: { type: animalTypes | null, gender: gender | null }
  getBarns: (pageNumber: number) => void
  selectBarn: (animal: IBarn | null) => void
  setFilters: (value: { type: animalTypes | null, gender: gender | null }) => void
}

export const useBarnStore = create<BarnState>((set, get) => ({
  barns: null,
  selectedBarn: null,
  filters: { type: null, gender: null },
  getBarns: (pageNumber) => {
    const temp = mockData.slice((pageNumber - 1) * webPageSize, pageNumber * webPageSize)
    set(() => ({
      barns: temp.map((barn) => new Barn(barn))
    }))
  },
  selectBarn: (barn) => {
    set(() => ({ selectedBarn: barn }))
  },
  setFilters: (value) => set({ filters: value })
}))