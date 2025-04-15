'use client'

import Pagination from "@/components/Pagination";
import { useStockStore } from "../../../../../../packages/shared/stores/useStockStore"
import { useEffect, useState } from "react";
import StockTable from "@/components/tables/StockTable";

export default function StocksPage() {
   const { getStocks } = useStockStore()
    const [pageNumber, setPageNumber] = useState(1)
  
    useEffect(() => {
      if(pageNumber) {
        getStocks(pageNumber)
      }
    }, [pageNumber])
  return (
    <div className="flex flex-col gap-4 relative h-full">
      <div>
        <div className="font-bold text-2xl">Stoklar</div>
        <div className="text-gray-500 text-xs">Bilgileri Düzenlemek İçin İlgili Satıra Tıklayınız</div>
      </div>
      <StockTable />
      <div className="absolute bottom-10 right-1/2 translate-1/2">
        <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} totalPages={3} />
      </div>
    </div>
  );
}