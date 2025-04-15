import Badge from "../Badge"
import { IBarn } from "../../../../../packages/shared/models"
import { useBarnStore } from "../../../../../packages/shared/stores/useBarnStore"
import { toReadableGender } from "../../../../../packages/shared/utils/toReadableGender"

export default function BarnTable() {
  const { barns } = useBarnStore()

  return <div className="flex flex-col gap-2">
    <BarnTableHeader />
    {
      barns?.map((barn, index) => {
        return <BarnTableItem barn={barn} key={index} />
      })
    }
  </div>
}

function BarnTableHeader() {
  return <div className="w-full flex flex-row justify-between items-center border border-gray-100 py-1 rounded-md">
    <div className="w-1/3 text-center text-sm">
      İsim
    </div>
    <div className="w-1/3 text-center text-sm">
      Tür
    </div>
    <div className="w-1/3 text-center text-sm">
      Cinsiyet
    </div>
  </div>
}

function BarnTableItem({
  barn
}: {
  barn: IBarn
}) {
  return <div className="w-full flex flex-row justify-between items-center border border-gray-100 py-1 rounded-md hover:border-[#7CFF6B] hover:bg-[#f4fef3] transition-colors cursor-pointer">
    <div className="w-1/3 text-center text-sm">
      {barn.name || "-"}
    </div>
    <div className="w-1/3 text-center text-sm">
      {barn.type || "-"}
    </div>
    <div className="w-1/3 text-center text-sm">
      <div className="w-full flex justify-center items-center">
        <Badge value={barn.gender} label={toReadableGender[barn.gender]} />
      </div>
    </div>
  </div>
}