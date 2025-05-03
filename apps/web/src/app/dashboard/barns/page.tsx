'use client'

import Pagination from "@/components/Pagination";
import BarnTable from "@/components/tables/BarnTable";
import { useBarnStore } from "@/stores/useBarnStore"
import { useEffect, useState } from "react";
import Drawer from "@/components/Drawer";
import Button from "@/components/Button";
import { Barn } from "../../../../../../packages/shared/classes";
import BarnForm from "@/components/forms/BarnForm";
import BarnFilterMenu from "@/components/filterMenus/BarnFilterMenu";
import { useUserStore } from "@/stores/useUserStore";

export default function BarnsPage() {
  const { getBarns, selectBarn, selectedBarn, getBarnCount, barnCount, filters } = useBarnStore()
  const { user } = useUserStore()
  const [pageNumber, setPageNumber] = useState(1)

  useEffect(() => {
    if (user?.id) {
      getBarnCount(user.id)
    }
  }, [user, filters])

  useEffect(() => {
    if (user?.id && pageNumber) {
      getBarns(user.id, pageNumber)
    }
  }, [pageNumber, filters])

  const handleCloseDrawer = () => {
    selectBarn(null)
  }

  return (
    <div className="flex flex-col gap-4 relative h-full">
      {selectedBarn && <Drawer onClose={handleCloseDrawer}>
        <BarnForm defaultBarn={selectedBarn} currentPage={pageNumber}/>
      </Drawer>}
      <div className="flex flex-row justify-between">
        <div>
          <div className="font-bold text-2xl">Ağıllar</div>
          <div className="text-gray-500 text-xs">Bilgileri Düzenlemek İçin İlgili Satıra Tıklayınız</div>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <BarnFilterMenu />
          <div className="w-32">
            <Button label="Ağıl Ekle" onClick={() => selectBarn(new Barn())} />
          </div>
        </div>
      </div>
      <BarnTable />
      <div className="absolute bottom-10 right-1/2 translate-1/2">
        <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} totalPages={barnCount / 10 + 1} />
      </div>
    </div>
  );
}