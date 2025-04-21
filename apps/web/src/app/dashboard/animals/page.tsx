'use client'

import Pagination from "@/components/Pagination";
import AnimalTable from "@/components/tables/AnimalTable";
import { useAnimalStore } from "../../../../../../packages/shared/stores/useAnimalStore"
import { useEffect, useState } from "react";
import Drawer from "@/components/Drawer";
import AnimalForm from "@/components/forms/AnimalForm";
import Button from "@/components/Button";
import { Animal } from "../../../../../../packages/shared/classes";
import AnimalFilterMenu from "@/components/filterMenus/AnimalFilterMenu";

export default function AnimalsPage() {
  const { getAnimals, selectedAnimal, selectAnimal } = useAnimalStore()
  const [pageNumber, setPageNumber] = useState(1)

  useEffect(() => {
    if (pageNumber) {
      getAnimals(pageNumber)
    }
  }, [pageNumber])

  const handleCloseDrawer = () => {
    selectAnimal(null)
  }

  return (
    <div className="flex flex-col gap-4 relative h-full">
      {selectedAnimal && <Drawer onClose={handleCloseDrawer}>
        <AnimalForm defaultAnimal={selectedAnimal} />
      </Drawer>
      }
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
      <AnimalTable />
      <div className="absolute bottom-10 right-1/2 translate-1/2">
        <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} totalPages={3} />
      </div>
    </div>
  );
}