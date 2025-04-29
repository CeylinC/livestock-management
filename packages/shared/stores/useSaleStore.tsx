import { create } from "zustand"
import { ISale } from "../models"
import { Sale } from "../classes"
import { webPageSize } from "../constant/pageSize";
import { paymentState, saleCategory } from "../enums";
import { supabase } from "../utils/supabaseClient";

interface SaleState {
  sales: ISale[] | null
  selectedSale: ISale | null
  filters: { category: saleCategory | null, paymentState: paymentState | null }
  saleCount: number,
  getSales: (userId: string, pageNumber: number) => void
  selectSale: (animal: ISale | null) => void
  setFilters: (value: { category: saleCategory | null, paymentState: paymentState | null }) => void
  getSaleCount: (userID: string) => void
}

export const useSaleStore = create<SaleState>((set, get) => ({
  sales: null,
  selectedSale: null,
  filters: { category: null, paymentState: null },
  saleCount: 0,
  getSales: async (userId, pageNumber) => {
    const { data, error } = await supabase
      .from('sales')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range((pageNumber - 1) * 10, pageNumber * 10 - 1);

    set(() => ({ sales: data ? data.map((sale => new Sale(sale))) : null }))
  },
  selectSale: (sale) => {
    set(() => ({ selectedSale: sale }))
  },
  setFilters: (value) => set({ filters: value }),
  getSaleCount: async (userID) => {
    const { count } = await supabase
      .from('sales')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userID);

    if (count && count >= 0) {
      console.log(count)
      set(() => ({ saleCount: count }))
    }
  },
}))