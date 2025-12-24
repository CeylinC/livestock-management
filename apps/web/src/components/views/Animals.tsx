'use client'

import { useEffect, useState } from "react"
import Pagination from "@/components/Pagination"
import AnimalTable from "@/components/tables/AnimalTable"
import Drawer from "@/components/Drawer"
import AnimalForm from "@/components/forms/AnimalForm"
import Button from "@/components/Button"
import { Animal } from "../../../../../packages/shared/classes/Animal"
import AnimalFilterMenu from "@/components/filterMenus/AnimalFilterMenu"
import { useAnimalStore } from "@/stores/useAnimalStore"
import { useUserStore } from "@/stores/useUserStore"
import { useBarnStore } from "@/stores/useBarnStore"
import Spinner from "@/components/Spinner"

export default function Animals() {
  const { getAnimals, selectedAnimal, selectAnimal, getAnimalCount, animalCount, filters } = useAnimalStore()
  const { getAllBarns } = useBarnStore()
  const { user } = useUserStore()
  const [pageNumber, setPageNumber] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchBarns = async () => {
      if (user?.id) {
        setIsLoading(true)
        await getAllBarns(user.id)
        setIsLoading(false)
      }
    }
    fetchBarns()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const fetchAnimalCount = async () => {
      if (user?.id) {
        setIsLoading(true)
        await getAnimalCount(user.id)
        setIsLoading(false)
      }
    }
    fetchAnimalCount()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, filters])

  useEffect(() => {
    const fetchAnimals = async () => {
      if (user?.id && pageNumber) {
        setIsLoading(true)
        await getAnimals(user.id, pageNumber)
        setIsLoading(false)
      }
    }
    fetchAnimals()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, filters])

  const handleCloseDrawer = () => {
    selectAnimal(null)
  }

  return (
    <div className="flex flex-col gap-4 relative h-full">
      {selectedAnimal && (
        <Drawer onClose={handleCloseDrawer}>
          <AnimalForm defaultAnimal={selectedAnimal} currentPage={pageNumber} onClose={handleCloseDrawer}/>
        </Drawer>
      )}

      <div className="flex flex-row justify-between">
        <div>
          <div className="font-bold text-2xl">Hayvanlar</div>
          <div className="text-gray-500 text-xs">Bilgileri Düzenlemek İçin İlgili Satıra Tıklayınız</div>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <AnimalFilterMenu />
          <div className="w-32">
            <Button label="Hayvan Ekle" onClick={() => selectAnimal(new Animal())} />
          </div>
        </div>
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <AnimalTable />
          <div className="-mt-5">
            <Pagination
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              totalPages={Math.ceil(animalCount / 10)}
            />
          </div>
        </>
      )}
    </div>
  )
}
