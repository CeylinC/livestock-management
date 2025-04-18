import { create } from "zustand"
import { ISale } from "../models"
import { Sale } from "../classes"
import mockData from "../mocks/sales.json"
import { webPageSize } from "../constant/pageSize";

interface SaleState {
  sales: ISale[] | null
  selectedSale: ISale | null
  getSales: (pageNumber: number) => void
  selectSale: (animal: ISale | null) => void
}

export const useSaleStore = create<SaleState>((set, get) => ({
  sales: null,
  selectedSale: null,
  getSales: (pageNumber) => {
    const temp = mockData.slice((pageNumber - 1) * webPageSize, pageNumber * webPageSize)
    set(() => ({
      sales: temp.map((sale) => new Sale(sale))
    }))
  },
  selectSale: (sale) => {
    set(() => ({ selectedSale: sale }))
  }
}))