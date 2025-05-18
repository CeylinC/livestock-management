'use client'

import { useEffect, useState } from "react"
import Pagination from "@/components/Pagination"
import SaleTable from "@/components/tables/SaleTable"
import Drawer from "@/components/Drawer"
import Button from "@/components/Button"
import { Sale } from "../../../../../packages/shared/classes"
import SaleForm from "@/components/forms/SaleForm"
import SaleFilterMenu from "@/components/filterMenus/SaleFilterMenu"
import { useSaleStore } from "@/stores/useSaleStore"
import { useUserStore } from "@/stores/useUserStore"
import Spinner from "@/components/Spinner"

export default function Sales() {
  const { getSales, selectSale, selectedSale, getSaleCount, saleCount, filters } = useSaleStore()
  const { user } = useUserStore()
  const [pageNumber, setPageNumber] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchSaleCount = async () => {
      if (user?.id) {
        setIsLoading(true)
        await getSaleCount(user.id)
        setIsLoading(false)
      }
    }
    fetchSaleCount()
  }, [user, filters])

  useEffect(() => {
    const fetchSales = async () => {
      if (user?.id && pageNumber) {
        setIsLoading(true)
        await getSales(user.id, pageNumber)
        setIsLoading(false)
      }
    }
    fetchSales()
  }, [pageNumber, filters])

  const handleCloseDrawer = () => {
    selectSale(null)
  }

  return (
    <div className="flex flex-col gap-4 relative h-full">
      {selectedSale && (
        <Drawer onClose={handleCloseDrawer}>
          <SaleForm defaultSale={selectedSale} currentPage={pageNumber} onClose={handleCloseDrawer}/>
        </Drawer>
      )}

      <div className="flex flex-row justify-between">
        <div>
          <div className="font-bold text-2xl">Satışlar</div>
          <div className="text-gray-500 text-xs">Bilgileri Düzenlemek İçin İlgili Satıra Tıklayınız</div>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <SaleFilterMenu />
          <div className="w-32">
            <Button label="Satış Ekle" onClick={() => selectSale(new Sale())} />
          </div>
        </div>
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <SaleTable />
          <div className="-mt-5">
            <Pagination
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              totalPages={Math.ceil(saleCount / 10)}
            />
          </div>
        </>
      )}
    </div>
  )
}
