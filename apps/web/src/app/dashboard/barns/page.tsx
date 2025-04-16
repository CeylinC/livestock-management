'use client'

import Pagination from "@/components/Pagination";
import BarnTable from "@/components/tables/BarnTable";
import { useBarnStore } from "../../../../../../packages/shared/stores/useBarnStore"
import { useEffect, useState } from "react";
import Drawer from "@/components/Drawer";

export default function BarnsPage() {
  const { getBarns, selectBarn, selectedBarn } = useBarnStore()
  const [pageNumber, setPageNumber] = useState(1)

  useEffect(() => {
    if (pageNumber) {
      getBarns(pageNumber)
    }
  }, [pageNumber])

  const handleCloseDrawer = () => {
    selectBarn(null)
  }

  return (
    <div className="flex flex-col gap-4 relative h-full">
      {selectedBarn && <Drawer onClose={handleCloseDrawer} />}
      <div>
        <div className="font-bold text-2xl">Ağıllar</div>
        <div className="text-gray-500 text-xs">Bilgileri Düzenlemek İçin İlgili Satıra Tıklayınız</div>
      </div>
      <BarnTable />
      <div className="absolute bottom-10 right-1/2 translate-1/2">
        <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} totalPages={3} />
      </div>
    </div>
  );
}