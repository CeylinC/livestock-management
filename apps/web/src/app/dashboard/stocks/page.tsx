'use client'

import Pagination from "@/components/Pagination";
import { useStockStore } from "../../../../../../packages/shared/stores/useStockStore"
import { useEffect, useState } from "react";
import StockTable from "@/components/tables/StockTable";
import Drawer from "@/components/Drawer";
import Button from "@/components/Button";
import { Stock } from "../../../../../../packages/shared/classes";
import StockForm from "@/components/forms/StockForm";
import StockFilterMenu from "@/components/filterMenus/StockFilterMenu";

export default function StocksPage() {
  const { getStocks, selectStock, selectedStock } = useStockStore()
  const [pageNumber, setPageNumber] = useState(1)

  useEffect(() => {
    if (pageNumber) {
      getStocks(pageNumber)
    }
  }, [pageNumber])

  const handleCloseDrawer = () => {
    selectStock(null)
  }

  return (
    <div className="flex flex-col gap-4 relative h-full">
      {selectedStock && <Drawer onClose={handleCloseDrawer}>
        <StockForm defaultStock={selectedStock} />
      </Drawer>}
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
      <StockTable />
      <div className="absolute bottom-10 right-1/2 translate-1/2">
        <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} totalPages={3} />
      </div>
    </div>
  );
}