'use client'

import { useEffect, useState } from "react"
import Pagination from "@/components/Pagination"
import StockTable from "@/components/tables/StockTable"
import Drawer from "@/components/Drawer"
import Button from "@/components/Button"
import { Stock } from "../../../../../../packages/shared/classes"
import StockForm from "@/components/forms/StockForm"
import StockFilterMenu from "@/components/filterMenus/StockFilterMenu"
import { useStockStore } from "@/stores/useStockStore"
import { useUserStore } from "@/stores/useUserStore"
import Spinner from "@/components/Spinner"

export default function StocksPage() {
  const { getStocks, selectStock, selectedStock, getStockCount, stockCount, filters } = useStockStore()
  const { user } = useUserStore()
  const [pageNumber, setPageNumber] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchStockCount = async () => {
      if (user?.id) {
        setIsLoading(true)
        await getStockCount(user.id)
        setIsLoading(false)
      }
    }
    fetchStockCount()
  }, [user, filters])

  useEffect(() => {
    const fetchStocks = async () => {
      if (user?.id && pageNumber) {
        setIsLoading(true)
        await getStocks(user.id, pageNumber)
        setIsLoading(false)
      }
    }
    fetchStocks()
  }, [pageNumber, filters])

  const handleCloseDrawer = () => {
    selectStock(null)
  }

  return (
    <div className="flex flex-col gap-4 relative h-full">
      {selectedStock && (
        <Drawer onClose={handleCloseDrawer}>
          <StockForm defaultStock={selectedStock} currentPage={pageNumber} />
        </Drawer>
      )}

      <div className="flex flex-row justify-between">
        <div>
          <div className="font-bold text-2xl">Stoklar</div>
          <div className="text-gray-500 text-xs">Bilgileri Düzenlemek İçin İlgili Satıra Tıklayınız</div>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <StockFilterMenu />
          <div className="w-32">
            <Button label="Stok Ekle" onClick={() => selectStock(new Stock())} />
          </div>
        </div>
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <StockTable />
          <div className="absolute bottom-10 right-1/2 translate-x-1/2">
            <Pagination
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              totalPages={Math.ceil(stockCount / 10)}
            />
          </div>
        </>
      )}
    </div>
  )
}
