import { create } from "zustand"
import { IBarn } from "../models"
import { Barn } from "../classes"
import mockData from "../mocks/barns.json"
import { webPageSize } from "../constant/pageSize";

interface BarnState {
  barns: IBarn[] | null
  selectedBarn: IBarn | null
  getBarns: (pageNumber: number) => void
  selectBarn: (animal: IBarn | null) => void
}

export const useBarnStore = create<BarnState>((set, get) => ({
  barns: null,
  selectedBarn: null,
  getBarns: (pageNumber) => {
    const temp = mockData.slice((pageNumber - 1) * webPageSize, pageNumber * webPageSize)
    set(() => ({
      barns: temp.map((barn) => new Barn(barn))
    }))
  },
  selectBarn: (barn) => {
    set(() => ({selectedBarn: barn}))
  }
}))