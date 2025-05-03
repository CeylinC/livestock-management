import { create } from "zustand"
import { IStock } from "../../../../packages/shared/models"
import { Stock } from "../../../../packages/shared/classes"
import { saleCategory } from "../../../../packages/shared/enums";
import { supabase } from "../utils/supabaseClient";

interface StockState {
  stocks: IStock[] | null
  selectedStock: IStock | null
  filters: { category: saleCategory | null }
  stockCount: number
  getStocks: (userId: string, pageNumber: number) => void
  selectStock: (animal: IStock | null) => void
  setFilters: (value: { category: saleCategory | null }) => void
  getStockCount: (userID: string) => void
  addStock: (userId: string, stock: IStock) => void
  updateStock: (userId: string, stock: IStock) => void
  deleteStock: (userId: string, stockId: string) => void
}

export const useStockStore = create<StockState>((set, get) => ({
  stocks: null,
  selectedStock: null,
  filters: { category: null },
  stockCount: 0,
  getStocks: async (userId, pageNumber) => {
    const { data, error } = await supabase
      .from('stocks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range((pageNumber - 1) * 10, pageNumber * 10 - 1);

    set(() => ({ stocks: data ? data.map((stock => new Stock(stock))) : null }))
  },
  selectStock: (stock) => {
    set(() => ({ selectedStock: stock }))
  },
  setFilters: (value) => set({ filters: value }),
  getStockCount: async (userID) => {
    const { count } = await supabase
      .from('stocks')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userID);

    if (count && count >= 0) {
      set(() => ({ stockCount: count }))
    }
  },
  addStock: async (userId, stock) => {
    const { data, error } = await supabase
      .from('stocks')
      .insert([{
        user_id: userId,
        name: stock.name,
        category: stock.category,
        amount: stock.amount,
        dealer: stock.dealer,
        storage: stock.storage,
      }])
      .select()
      .single()

    set((state) => ({ stocks: state.stocks ? [new Stock(data), ...state.stocks].slice(0, -1) : [new Stock(data)] }))
  },
  updateStock: async (userId, stock) => {
    const { data, error } = await supabase
      .from('stocks')
      .update({
        name: stock.name,
        category: stock.category,
        amount: stock.amount,
        dealer: stock.dealer,
        storage: stock.storage
      })
      .eq('id', stock.id)
      .eq('user_id', userId)
      .select()
      .single();

    set((state) => ({
      stocks: state.stocks
        ? state.stocks.map((s) => s.id === stock.id ? new Stock(data) : s)
        : []
    }));
  },
  deleteStock: async (userId, stockId) => {
    const { error } = await supabase
      .from('stocks')
      .delete()
      .eq('id', stockId)
      .eq('user_id', userId);

    if (!error) {
      set((state) => ({
        stocks: state.stocks
          ? state.stocks.filter(stock => stock.id !== stockId)
          : []
      }));
    }
  }

}))