import { create } from "zustand"
import { ISale } from "../models"
import { Sale } from "../classes"
import mockData from "../mocks/sales.json"
import { webPageSize } from "../constant/pageSize";
import { paymentState, saleCategory } from "../enums";

interface SaleState {
  sales: ISale[] | null
  selectedSale: ISale | null
  filters: { category: saleCategory | null, paymentState: paymentState | null }
  getSales: (pageNumber: number) => void
  selectSale: (animal: ISale | null) => void
  setFilters: (value: { category: saleCategory | null, paymentState: paymentState | null }) => void
}

export const useSaleStore = create<SaleState>((set, get) => ({
  sales: null,
  selectedSale: null,
  filters: { category:  null, paymentState: null },
  getSales: (pageNumber) => {
    const temp = mockData.slice((pageNumber - 1) * webPageSize, pageNumber * webPageSize)
    set(() => ({
      sales: temp.map((sale) => new Sale(sale))
    }))
  },
  selectSale: (sale) => {
    set(() => ({ selectedSale: sale }))
  },
  setFilters: (value) => set({ filters: value })
}))