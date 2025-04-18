'use client'

import Pagination from "@/components/Pagination";
import { useSaleStore } from "../../../../../../packages/shared/stores/useSaleStore"
import { useEffect, useState } from "react";
import SaleTable from "@/components/tables/SaleTable";
import Drawer from "@/components/Drawer";

export default function SalesPage() {
  const { getSales, selectSale, selectedSale } = useSaleStore()
  const [pageNumber, setPageNumber] = useState(1)

  useEffect(() => {
    if (pageNumber) {
      getSales(pageNumber)
    }
  }, [pageNumber])

  const handleCloseDrawer = () => {
    selectSale(null)
  }

  return (
    <div className="flex flex-col gap-4 relative h-full">
      {selectedSale && <Drawer onClose={handleCloseDrawer} />}
      <div>
        <div className="font-bold text-2xl">Satışlar</div>
        <div className="text-gray-500 text-xs">Bilgileri Düzenlemek İçin İlgili Satıra Tıklayınız</div>
      </div>
      <SaleTable />
      <div className="absolute bottom-10 right-1/2 translate-1/2">
        <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} totalPages={3} />
      </div>
    </div>
  );
}