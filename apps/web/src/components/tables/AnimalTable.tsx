import Badge from "../Badge"
import { useAnimalStore } from "@/stores/useAnimalStore"
import { IAnimal } from "../../../../../packages/shared/models"
import { toReadableGender } from "../../../../../packages/shared/utils/toReadableGender"
import dayjs from "dayjs"
import { toReadableAnimalType } from "../../../../../packages/shared/utils/toReadableAnimalType"
import { useBarnStore } from "@/stores/useBarnStore"

export default function AnimalTable() {
  const { animals } = useAnimalStore()


  return <div className="flex flex-col gap-2">
    <AnimalTableHeader />
    {
      animals?.map((animal, index) => {
        return <AnimalTableItem animal={animal} key={index} />
      })
    }
  </div>
}

function AnimalTableHeader() {
  return <div className="w-full h-[50px] flex flex-row justify-between items-center border border-gray-100 py-1 rounded-md">
    <div className="w-1/6">
      <div className="w-full text-center text-sm">
        İsim
      </div>
      <div className="w-full text-center text-sm">
        Kulak Numarası
      </div>
    </div>
    <div className="w-1/6">
      <div className="w-full text-center text-sm">
        Tür
      </div>
      <div className="w-full text-center text-sm">
        Cins
      </div>
    </div>
    <div className="w-1/6 text-center text-sm">
      Ağırlık
    </div>
    <div className="w-1/6 text-center text-sm">
      Doğum Tarihi
    </div>
    <div className="w-1/6 flex flex-row items-center justify-center">
      <div className="w-full text-center text-sm">
        Cinsiyet
      </div>
      <span className="text-gray-300">/</span>
      <div className="w-full text-center text-sm">
        Hamilelik
      </div>
    </div>
    <div className="w-1/6 text-center text-sm">
      Ağıl
    </div>
  </div>
}

function AnimalTableItem({
  animal
}: {
  animal: IAnimal
}) {
  const { selectAnimal } = useAnimalStore()
  const { allBarns } = useBarnStore()

  const selectTableItem = (animal: IAnimal) => {
    selectAnimal(animal)
  }

  return <div
    className="w-full h-[50px] flex flex-row justify-between items-center border border-gray-100 py-1 rounded-md hover:border-[#7CFF6B] hover:bg-[#f4fef3] transition-colors cursor-pointer"
    onClick={() => selectTableItem(animal)}
  >
    <div className="w-1/6">
      <div className="w-full text-center text-sm font-bold">
        {animal.name || "-"}
      </div>
      <div className="w-full text-center text-sm font-light text-gray-500">
        {animal.earring || "-"}
      </div>
    </div>
    <div className="w-1/6">
      <div className="w-full text-center text-sm">
        {toReadableAnimalType[animal.type] || "-"}
      </div>
      <div className="w-full text-center text-sm font-light text-gray-500">
        {animal.genus || "-"}
      </div>
    </div>
    <div className="w-1/6 text-center text-sm">
      {animal.weight || "-"}
    </div>
    <div className="w-1/6 text-center text-sm">
      {dayjs(animal.birthday).format("DD/MM/YYYY") || "-"}
    </div>
    <div className="w-1/6 flex flex-row items-center justify-center">
      <div className="w-full flex justify-center items-center">
        <Badge value={animal.gender} label={toReadableGender[animal.gender]} />
      </div>
      <span className="text-gray-300">/</span>
      <div className="w-full text-center text-sm">
        {animal.isPregnant ? <Badge value={animal.isPregnant ? "PREGNANT" : undefined} label={"Hamile"} /> : "-"}
      </div>
    </div>
    <div className="w-1/6 text-center text-sm">
      {allBarns?.find((barn) => barn.id == animal.barnName)?.name || "-"}
    </div>
  </div>
}