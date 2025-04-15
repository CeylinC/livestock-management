import Badge from "../Badge"
import { IStock } from "../../../../../packages/shared/models"
import { useStockStore } from "../../../../../packages/shared/stores/useStockStore"
import { toReadableSalesCategories } from "../../../../../packages/shared/utils/toReadableSalesCategories"

export default function StockTable() {
  const { stocks } = useStockStore()

  return <div className="flex flex-col gap-2">
    <StockTableHeader />
    {
      stocks?.map((stock, index) => {
        return <StockTableItem stock={stock} key={index} />
      })
    }
  </div>
}

function StockTableHeader() {
  return <div className="w-full flex flex-row justify-between items-center border border-gray-100 py-1 rounded-md">
    <div className="w-1/5 text-center text-sm">
      İsim
    </div>
    <div className="w-1/5 text-center text-sm">
      Kategori
    </div>
    <div className="w-1/5 text-center text-sm">
      Miktar
    </div>
    <div className="w-1/5 text-center text-sm">
      Satıcı
    </div>
    <div className="w-1/5 text-center text-sm">
      Stok Yeri
    </div>
  </div>
}

function StockTableItem({
  stock
}: {
  stock: IStock
}) {
  return <div className="w-full flex flex-row justify-between items-center border border-gray-100 py-1 rounded-md hover:border-[#7CFF6B] hover:bg-[#f4fef3] transition-colors cursor-pointer">
    <div className="w-1/3 text-center text-sm">
      {stock.name || "-"}
    </div>
    <div className="w-1/3 text-center text-sm">
      <div className="w-full flex justify-center items-center">
        <Badge value={stock.category} label={toReadableSalesCategories[stock.category]} />
      </div>
    </div>
    <div className="w-1/3 text-center text-sm">
      {stock.amount || "-"}
    </div>
    <div className="w-1/3 text-center text-sm">
      {stock.dealer || "-"}
    </div>
    <div className="w-1/3 text-center text-sm">
      {stock.storage || "-"}
    </div>
  </div>
}