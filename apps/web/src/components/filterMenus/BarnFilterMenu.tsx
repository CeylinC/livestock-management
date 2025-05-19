import { gender } from "../../../../../packages/shared/enums";
import { animalTypes } from "../../../../../packages/shared/enums/animalTypes";
import { useBarnStore } from "@/stores/useBarnStore";
import { toReadableAnimalType } from "../../../../../packages/shared/utils/toReadableAnimalType";
import { toReadableGender } from "../../../../../packages/shared/utils/toReadableGender";
import Dropdown from "../Dropdown";
import Popover from "../Popover";

export default function BarnFilterMenu() {
  const { filters, setFilters } = useBarnStore();

  const genderOptions = [
    {
      label: "Hepsi",
      value: "",
    },
    ...Object.values(gender).map((g) => ({
      label: toReadableGender[g],
      value: g.toString(),
    })),
  ];

  const typeOptions = [
    {
      label: "Hepsi",
      value: "",
    },
    ...Object.values(animalTypes).map((g) => ({
      label: toReadableAnimalType[g],
      value: g,
    })),
  ];

  const onChangeType = (value: animalTypes | null) => {
    setFilters({ ...filters, type: value })
  }

  const onChangeGender = (value: gender | null) => {
    setFilters({ ...filters, gender: value })
  }

  return <div>
    <Popover
      content={
        <div className="flex flex-col gap-2">
          <Dropdown
            label="Tür"
            options={typeOptions}
            value={filters.type ?? ""}
            onChange={(val) => onChangeType((val as animalTypes) || null)}
            placeholder="Seçiniz"
          />
          <Dropdown
            label="Cinsiyet"
            options={genderOptions}
            value={filters.gender ?? ""}
            onChange={(val) => onChangeGender((val as gender) || null)}
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