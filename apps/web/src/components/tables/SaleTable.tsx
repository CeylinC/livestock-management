import Badge from "../Badge"
import { ISale } from "../../../../../packages/shared/models"
import { useSaleStore } from "../../../../../packages/shared/stores/useSaleStore"
import { toReadableSalesCategories } from "../../../../../packages/shared/utils/toReadableSalesCategories"
import { toReadablePaymentState } from "../../../../../packages/shared/utils/toReadablePaymentState"
import dayjs from "dayjs"

export default function SaleTable() {
  const { sales } = useSaleStore()

  return <div className="flex flex-col gap-2">
    <SaleTableHeader />
    {
      sales?.map((sale, index) => {
        return <SaleTableItem sale={sale} key={index} />
      })
    }
  </div>
}

function SaleTableHeader() {
  return <div className="w-full h-[50px] flex flex-row justify-between items-center border border-gray-100 py-1 rounded-md">
    <div className="w-1/7 text-center text-sm">
      İsim
    </div>
    <div className="w-1/7 text-center text-sm">
     Kategori
    </div>
    <div className="w-1/7">
      <div className="w-full text-center text-sm">
        Miktar
      </div>
      <div className="w-full text-center text-sm font-light">
        Tip
      </div>
    </div>
    <div className="w-1/7 text-center text-sm">
      Ücret
    </div>
    <div className="w-1/7 text-center text-sm">
      Satış Tarihi
    </div>
    <div className="w-1/7">
      <div className="w-full text-center text-sm">
        Alıcı İsmi
      </div>
      <div className="w-full text-center text-sm font-light text-gray-500">
        İletişim
      </div>
    </div>
    <div className="w-1/7">
      <div className="w-full text-center text-sm">
        Ödeme Durumu
      </div>
      <div className="w-full text-center text-sm font-light">
        Ödeme Tarihi
      </div>
    </div>
  </div>
}

function SaleTableItem({
  sale
}: {
  sale: ISale
}) {
  return <div className="w-full h-[50px] flex flex-row justify-between items-center border border-gray-100 py-1 rounded-md hover:border-[#7CFF6B] hover:bg-[#f4fef3] transition-colors cursor-pointer">
    <div className="w-1/7 text-center text-sm">
      {sale.name || "-"}
    </div>
    <div className="w-1/7 text-center text-sm">
      <div className="w-full flex justify-center items-center">
        <Badge value={sale.category} label={toReadableSalesCategories[sale.category]} />
      </div>
    </div>
    <div className="w-1/7">
      <div className="w-full text-center text-sm font-bold">
        {sale.amount || "-"}
      </div>
      <div className="w-full text-center text-sm font-light text-gray-500">
        {sale.type || "-"}
      </div>
    </div>
    <div className="w-1/7 text-center text-sm">
      {sale.price || "-"}
    </div>
    <div className="w-1/7 text-center text-sm">
      {dayjs(sale.saleDate).format("DD/MM/YYYY") || "-"}
    </div>
    <div className="w-1/7">
      <div className="w-full text-center text-sm">
        {sale.recipientName || "-"}
      </div>
      <div className="w-full text-center text-sm font-light text-gray-500">
        {sale.contact || "-"}
      </div>
    </div>
    <div className="w-1/7">
      <div className="w-full text-center text-sm font-bold">
        {toReadablePaymentState[sale.paymentState] || "-"}
      </div>
      <div className="w-full text-center text-sm font-light text-gray-500">
        {dayjs(sale.paymentDate).format("DD/MM/YYYY") || "-"}
      </div>
    </div>
  </div>
}