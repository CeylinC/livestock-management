import { saleCategory } from "../../../../../packages/shared/enums";
import { useStockStore } from "../../../../../packages/shared/stores/useStockStore";
import { toReadableSalesCategories } from "../../../../../packages/shared/utils/toReadableSalesCategories";
import Dropdown from "../Dropdown";
import Popover from "../Popover";

export default function StockFilterMenu() {
  const { filters, setFilters } = useStockStore();

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
      children={
        <div className="h-10 px-4 border border-gray-300 rounded-md text-gray-400 flex items-center transition hover:brightness-90 hover:bg-black/5">
          Filtrele
        </div>
      }
    />
  </div>
}