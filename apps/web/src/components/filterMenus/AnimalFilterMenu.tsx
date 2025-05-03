import { gender } from "../../../../../packages/shared/enums";
import { animalTypes } from "../../../../../packages/shared/enums/animalTypes";
import { useAnimalStore } from "@/stores/useAnimalStore";
import { toReadableAnimalType } from "../../../../../packages/shared/utils/toReadableAnimalType";
import { toReadableGender } from "../../../../../packages/shared/utils/toReadableGender";
import Dropdown from "../Dropdown";
import Popover from "../Popover";

export default function AnimalFilterMenu() {
  const { filters, setFilters } = useAnimalStore();

  const genderOptions = [
    ...[gender.female, gender.male].map((g) => ({
      label: toReadableGender[g],
      value: g.toString(),
    })),
    {
      label: "Hepsi",
      value: "",
    },
  ];

  const typeOptions = [
    ...Object.values(animalTypes).map((g) => ({
      label: toReadableAnimalType[g],
      value: g,
    })),
    {
      label: "Hepsi",
      value: "",
    },
  ];

  const onChangeType = (value: animalTypes | null) => {
    setFilters({ ...filters, type: value })
  }

  const onChangeGender = (value: gender | null) => {
    setFilters({ ...filters, gender: value })
  }

  const onChangeBarn = (value: string | null) => {
    setFilters({ ...filters, barn: value })
  }

  return <div>
    <Popover
      content={
        <div className="flex flex-col gap-2">
          <Dropdown
            label="Cinsiyet"
            options={typeOptions}
            value={filters.type ?? ""}
            onChange={(val) => onChangeType((val as animalTypes) || null)}
            placeholder="Seçiniz"
          />
          <Dropdown
            label="Tür"
            options={genderOptions}
            value={filters.gender ?? ""}
            onChange={(val) => onChangeGender((val as gender) || null)}
            placeholder="Seçiniz"
          />
          <Dropdown
            label="Ağıl"
            options={genderOptions}
            value={filters.barn ?? ""}
            onChange={(val) => onChangeBarn(val || null)}
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