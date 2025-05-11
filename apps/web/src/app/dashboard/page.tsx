'use client'

import { useHomepageStore } from "@/stores/useHomepageStore";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect } from "react";
import { toReadableAnimalType } from "../../../../../packages/shared/utils/toReadableAnimalType";
import { animalTypes } from "../../../../../packages/shared/enums/animalTypes";
import Badge from "@/components/Badge";
import { gender } from "../../../../../packages/shared/enums";
import { toReadableGender } from "../../../../../packages/shared/utils/toReadableGender";
import { count } from "console";

export default function DashboardPage() {
  const { getHomepageData, animals, barns, totalAnimal, totalBarn } = useHomepageStore()
  const { user } = useUserStore()

  useEffect(() => {
    if (user?.id) {
      getHomepageData(user.id)
    }
  }, [user?.id])

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold text-xl">Anasayfa</h1>
      <div>
        <div className="border border-gray-100 p-3 flex flex-col rounded-lg gap-4">
          <div className="flex flex-row">
            <div className="font-bold text-lg">Toplam Hayvan: </div>
            <div className="font-bold text-lg ml-2">{totalAnimal}</div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {animals && Object.entries(animals).map(([type, counts]) => (
              <div key={type} className="flex flex-col border border-gray-100 p-4 rounded-lg items-center text-center">
                <h3 className="font-semibold mb-2">{toReadableAnimalType[type as animalTypes]} Hayvan Sayısı: {counts.FEMALE + counts.MALE}</h3>
                <div className="text-sm">
                  <div className="mb-1">
                    <Badge value={gender.male} label={toReadableGender[gender.male]} />: {counts.MALE}
                  </div>
                  <div>
                    <Badge value={gender.female} label={toReadableGender[gender.female]} />: {counts.FEMALE}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="border border-gray-100 p-3 flex flex-col rounded-lg gap-4">
          <div className="flex flex-row">
            <div className="font-bold text-lg">Toplam Ağıl: </div>
            <div className="font-bold text-lg ml-2">{totalBarn}</div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {barns && Object.entries(barns).map(([type, counts]) => (
              <div key={type} className="flex flex-col border border-gray-100 p-4 rounded-lg items-center text-center">
                <h3 className="font-semibold mb-2">{toReadableAnimalType[type as animalTypes]} Ağıl Sayısı: {counts.FEMALE + counts.MALE + counts.KARMA}</h3>
                <div className="text-sm">
                  <div className="mb-1">
                    <Badge value={gender.male} label={toReadableGender[gender.male]} />: {counts.MALE}
                  </div>
                  <div className="mb-1">
                    <Badge value={gender.female} label={toReadableGender[gender.female]} />: {counts.FEMALE}
                  </div>
                  <div>
                    <Badge value={gender.karma} label={toReadableGender[gender.karma]} />: {counts.KARMA}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}