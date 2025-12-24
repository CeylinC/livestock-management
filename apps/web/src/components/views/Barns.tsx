'use client'

import { useEffect, useState } from "react"
import Pagination from "@/components/Pagination"
import BarnTable from "@/components/tables/BarnTable"
import Drawer from "@/components/Drawer"
import Button from "@/components/Button"
import { Barn } from "../../../../../packages/shared/classes"
import BarnForm from "@/components/forms/BarnForm"
import BarnFilterMenu from "@/components/filterMenus/BarnFilterMenu"
import { useBarnStore } from "@/stores/useBarnStore"
import { useUserStore } from "@/stores/useUserStore"
import Spinner from "@/components/Spinner"

export default function Barns() {
  const { getBarns, selectBarn, selectedBarn, getBarnCount, barnCount, filters } = useBarnStore()
  const { user } = useUserStore()
  const [pageNumber, setPageNumber] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchBarnCount = async () => {
      if (user?.id) {
        setIsLoading(true)
        await getBarnCount(user.id)
        setIsLoading(false)
      }
    }
    fetchBarnCount()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, filters])

  useEffect(() => {
    const fetchBarns = async () => {
      if (user?.id && pageNumber) {
        setIsLoading(true)
        await getBarns(user.id, pageNumber)
        setIsLoading(false)
      }
    }
    fetchBarns()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, filters])

  const handleCloseDrawer = () => {
    selectBarn(null)
  }

  return (
    <div className="flex flex-col gap-4 relative h-full">
      {selectedBarn && (
        <Drawer onClose={handleCloseDrawer}>
          <BarnForm defaultBarn={selectedBarn} currentPage={pageNumber} onClose={handleCloseDrawer}/>
        </Drawer>
      )}

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

      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <BarnTable />
          <div className="-mt-5">
            <Pagination
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              totalPages={Math.ceil(barnCount / 10)}
            />
          </div>
        </>
      )}
    </div>
  )
}
