import { gender } from "../../../../../packages/shared/enums";
import { animalTypes } from "../../../../../packages/shared/enums/animalTypes";
import { useAnimalStore } from "@/stores/useAnimalStore";
import { toReadableAnimalType } from "../../../../../packages/shared/utils/toReadableAnimalType";
import { toReadableGender } from "../../../../../packages/shared/utils/toReadableGender";
import Dropdown from "../Dropdown";
import Popover from "../Popover";
import { useBarnStore } from "@/stores/useBarnStore";

export default function AnimalFilterMenu() {
  const { filters, setFilters, } = useAnimalStore();
  const { allBarns } = useBarnStore()

  const genderOptions = [
    {
      label: "Hepsi",
      value: "",
    },
    ...[gender.female, gender.male].map((g) => ({
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


  const barnOptions = [
    {
      label: "Hepsi",
      value: "",
    },
    ...allBarns?.map(b => ({
      label: b.name,
      value: b.id,
    })) ?? []
  ]

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
          <Dropdown
            label="Ağıl"
            options={barnOptions || []}
            value={filters.barn ?? ""}
            onChange={(val) => onChangeBarn(val || null)}
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