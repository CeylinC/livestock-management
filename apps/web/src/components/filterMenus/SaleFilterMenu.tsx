import { paymentState, saleCategory } from "../../../../../packages/shared/enums";
import { useSaleStore } from "@/stores/useSaleStore";
import { toReadablePaymentState } from "../../../../../packages/shared/utils/toReadablePaymentState";
import { toReadableSalesCategories } from "../../../../../packages/shared/utils/toReadableSalesCategories";
import Dropdown from "../Dropdown";
import Popover from "../Popover";

export default function SaleFilterMenu() {
  const { filters, setFilters } = useSaleStore();

  const categoryOptions = [
    ...Object.values(saleCategory).map((g) => ({
      label: toReadableSalesCategories[g],
      value: g,
    })),
    {
      label: "Hepsi",
      value: "",
    },
  ];

  const paymentStateOptions = [
    ...Object.values(paymentState).map((g) => ({
      label: toReadablePaymentState[g],
      value: g,
    })),
    {
      label: "Hepsi",
      value: "",
    },
  ];

  const onChangeCategory = (value: saleCategory | null) => {
    setFilters({ ...filters, category: value })
  }

  const onChangePaymentState = (value: paymentState | null) => {
    setFilters({ ...filters, paymentState: value })
  }


  return <div>
    <Popover
      content={
        <div className="flex flex-col gap-2">
          <Dropdown
            label="Kategori"
            options={categoryOptions}
            value={filters.category ?? ""}
            onChange={(val) => onChangeCategory((val as saleCategory) || null)}
            placeholder="Seçiniz"
          />
          <Dropdown
            label="Ödeme Durumu"
            options={paymentStateOptions}
            value={filters.paymentState ?? ""}
            onChange={(val) => onChangePaymentState((val as paymentState) || null)}
            placeholder="Seçiniz"
          />
        </div>
      }
      children={
        <div className="h-10 px-4 border border-gray-300 rounded-md text-gray-400 flex items-center transition hover:brightness-90 hover:bg-black/5">
          Filtrele
        </div>
      }
    />
  </div>
}