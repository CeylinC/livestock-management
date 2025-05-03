'use client'

import Pagination from "@/components/Pagination";
import { useSaleStore } from "@/stores/useSaleStore"
import { useEffect, useState } from "react";
import SaleTable from "@/components/tables/SaleTable";
import Drawer from "@/components/Drawer";
import Button from "@/components/Button";
import { Sale } from "../../../../../../packages/shared/classes";
import SaleForm from "@/components/forms/SaleForm";
import SaleFilterMenu from "@/components/filterMenus/SaleFilterMenu";
import { useUserStore } from "@/stores/useUserStore";

export default function SalesPage() {
  const { getSales, selectSale, selectedSale, getSaleCount, saleCount } = useSaleStore()
  const { user } = useUserStore()
  const [pageNumber, setPageNumber] = useState(1)

  useEffect(() => {
    if(user?.id) {
      getSaleCount(user.id)
    }
  }, [user])

  useEffect(() => {
    if (user?.id && pageNumber) {
      getSales(user.id, pageNumber)
    }
  }, [pageNumber])

  const handleCloseDrawer = () => {
    selectSale(null)
  }

  return (
    <div className="flex flex-col gap-4 relative h-full">
      {selectedSale && <Drawer onClose={handleCloseDrawer}>
        <SaleForm defaultSale={selectedSale} currentPage={pageNumber}/>
      </Drawer>}
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
      <SaleTable />
      <div className="absolute bottom-10 right-1/2 translate-1/2">
        <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} totalPages={saleCount / 10 + 1} />
      </div>
    </div>
  );
}