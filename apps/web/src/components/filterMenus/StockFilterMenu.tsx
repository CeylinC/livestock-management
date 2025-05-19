import { saleCategory } from "../../../../../packages/shared/enums";
import { useStockStore } from "@/stores/useStockStore";
import { toReadableSalesCategories } from "../../../../../packages/shared/utils/toReadableSalesCategories";
import Dropdown from "../Dropdown";
import Popover from "../Popover";

export default function StockFilterMenu() {
  const { filters, setFilters } = useStockStore();

  const categoryOptions = [
    {
      label: "Hepsi",
      value: "",
    },
    ...Object.values(saleCategory).map((g) => ({
      label: toReadableSalesCategories[g],
      value: g,
    })),
  ];

  const onChangeCategory = (value: saleCategory | null) => {
    setFilters({ ...filters, category: value })
  }

  return <div>
    <Popover
      content={
        <div>
          <Dropdown
            label="Kategori"
            options={categoryOptions}
            value={filters.category ?? ""}
            onChange={(val) => onChangeCategory((val as saleCategory) || null)}
            placeholder="Seçiniz"
          />
        </div>
      }
    >
      <div className="h-10 px-4 border border-gray-300 rounded-md text-gray-400 flex items-center transition hover:brightness-90 hover:bg-black/5">
        Filtrele
      </div>
    </Popover>
  </div>
}