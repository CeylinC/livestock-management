import { create } from "zustand"
import { IStock } from "../models"
import { Stock } from "../classes"
import mockData from "../mocks/stocks.json"
import { webPageSize } from "../constant/pageSize";

interface StockState {
  stocks: IStock[] | null
  selectedStock: IStock | null
  getStocks: (pageNumber: number) => void
  selectStock: (animal: IStock | null) => void
}

export const useStockStore = create<StockState>((set, get) => ({
  stocks: null,
  selectedStock: null,
  getStocks: (pageNumber) => {
    const temp = mockData.slice((pageNumber - 1) * webPageSize, pageNumber * webPageSize)
    set(() => ({
      stocks: temp.map((stock) => new Stock(stock))
    }))
  },
  selectStock: (stock) => {
    set(() => ({ selectedStock: stock }))
  }
}))