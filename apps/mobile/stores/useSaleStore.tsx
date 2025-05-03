import { create } from "zustand"
import { ISale } from "../../../packages/shared/models"
import { Sale } from "../../../packages/shared/classes"
import { paymentState, saleCategory } from "../../../packages/shared/enums";
import { supabase } from "../utils/supabaseClient";

interface SaleState {
  sales: ISale[] | null
  selectedSale: ISale | null
  filters: { category: saleCategory | null, paymentState: paymentState | null }
  saleCount: number,
  getSales: (userId: string, pageNumber: number) => void
  selectSale: (sale: ISale | null) => void
  setFilters: (value: { category: saleCategory | null, paymentState: paymentState | null }) => void
  getSaleCount: (userID: string) => void
  addSale: (userId: string, sale: ISale) => void
  updateSale: (userId: string, sale: ISale) => void
  deleteSale: (userId: string, saleId: string) => void
}

export const useSaleStore = create<SaleState>((set, get) => ({
  sales: null,
  selectedSale: null,
  filters: { category: null, paymentState: null },
  saleCount: 0,
  getSales: async (userId, pageNumber) => {
    const { filters } = get()
  
    let query = supabase
      .from('sales')
      .select('*')
      .eq('user_id', userId)
  
    if (filters.category) {
      query = query.eq('category', filters.category)
    }
  
    if (filters.paymentState) {
      query = query.eq('payment_state', filters.paymentState)
    }
  
    query = query
      .order('created_at', { ascending: false })
      .range((pageNumber - 1) * 10, pageNumber * 10 - 1)
  
    const { data, error } = await query
  
    set(() => ({ sales: data ? data.map(sale => new Sale(sale)) : null }))
  },
  selectSale: (sale) => {
    set(() => ({ selectedSale: sale }))
  },
  setFilters: (value) => set({ filters: value }),
  getSaleCount: async (userID) => {
    const { filters } = get()
  
    let query = supabase
      .from('sales')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userID)
  
    if (filters.category) {
      query = query.eq('category', filters.category)
    }
  
    if (filters.paymentState) {
      query = query.eq('payment_state', filters.paymentState)
    }
  
    const { count } = await query
  
    if (count !== null && count >= 0) {
      set(() => ({ saleCount: count }))
    }
  },  
  addSale: async (userId, sale) => {
    const { data, error } = await supabase
      .from('sales')
      .insert([{
        user_id: userId,
        name: sale.name,
        category: sale.category,
        amount: sale.amount,
        price: sale.price,
        sale_date: sale.saleDate.toDate(),
        recipient_name: sale.recipientName,
        contact: sale.contact,
        payment_state: sale.paymentState,
        payment_date: sale.saleDate.toDate()
      }])
      .select()
      .single()

    set((state) => ({ sales: state.sales ? [new Sale(data), ...state.sales].slice(0, -1) : [new Sale(data)] }))
  },
  updateSale: async (userId, sale) => {
    const { data, error } = await supabase
      .from('sales')
      .update({
        name: sale.name,
        category: sale.category,
        amount: sale.amount,
        price: sale.price,
        sale_date: sale.saleDate.toDate(),
        recipient_name: sale.recipientName,
        contact: sale.contact,
        payment_state: sale.paymentState,
        payment_date: sale.saleDate.toDate()
      })
      .eq('id', sale.id)
      .eq('user_id', userId)
      .select()
      .single();
  
    set((state) => ({
      sales: state.sales
        ? state.sales.map((s) => s.id === sale.id ? new Sale(data) : s)
        : []
    }));
  },
  deleteSale: async (userId, saleId) => {
    const { error } = await supabase
      .from('sales')
      .delete()
      .eq('id', saleId)
      .eq('user_id', userId);
  
    if (!error) {
      set((state) => ({
        sales: state.sales
          ? state.sales.filter(sale => sale.id !== saleId)
          : []
      }));
    }
  }
  
  
}))