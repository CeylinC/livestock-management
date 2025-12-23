import Badge from "../Badge";
import { IBarn } from "../../../../../packages/shared/models";
import { useBarnStore } from "@/stores/useBarnStore";
import { toReadableGender } from "../../../../../packages/shared/utils/toReadableGender";
import { toReadableAnimalType } from "../../../../../packages/shared/utils/toReadableAnimalType";
import dayjs from "dayjs";

export default function BarnTable() {
  const { barns } = useBarnStore();

  return (
    <div className="flex flex-col gap-2">
      <BarnTableHeader />
      {barns?.map((barn, index) => {
        return <BarnTableItem barn={barn} key={index} />;
      })}
    </div>
  );
}

function BarnTableHeader() {
  return (
    <div className="w-full h-[50px] flex flex-row justify-between items-center border border-gray-100 py-1 rounded-md">
      <div className="flex-1 text-center text-sm">İsim</div>
      <div className="flex-1 text-center text-sm">Tür</div>
      <div className="flex-1 text-center text-sm">Cinsiyet</div>
      <div className="flex-1 text-center text-sm">Su var mı</div>
      <div className="flex-1 text-center text-sm">Yem ağırlığı</div>
      <div className="flex-1 text-center text-sm">Nem</div>
      <div className="flex-1 text-center text-sm">Sıcaklık</div>
      <div className="flex-1 text-center text-sm">Yollama tarihi</div>
    </div>
  );
}

function BarnTableItem({ barn }: { barn: IBarn }) {
  const { selectBarn } = useBarnStore();

  const selectTableItem = (barn: IBarn) => {
    selectBarn(barn);
  };

  return (
    <div
      className="w-full h-[50px] flex flex-row justify-between items-center border border-gray-100 py-1 rounded-md hover:border-[#7CFF6B] hover:bg-[#f4fef3] transition-colors cursor-pointer"
      onClick={() => selectTableItem(barn)}
    >
      <div className="flex-1 text-center text-sm">{barn.name || "-"}</div>
      <div className="flex-1 text-center text-sm">
        {toReadableAnimalType[barn.type] || "-"}
      </div>
      <div className="flex-1 text-center text-sm">
        <div className="w-full flex justify-center items-center">
          <Badge value={barn.gender} label={toReadableGender[barn.gender]} />
        </div>
      </div>
      <div className="flex-1 text-center text-sm">
        {barn.sensorData?.water !== undefined
          ? barn.sensorData.water
            ? "Var"
            : "Yok"
          : "-"}
      </div>
      <div className="flex-1 text-center text-sm">
        {barn.sensorData?.weight !== undefined
          ? barn.sensorData.weight + " g"
          : "-"}
      </div>
      <div className="flex-1 text-center text-sm">
        {barn.sensorData?.humidity !== undefined
          ? barn.sensorData.humidity + "%"
          : "-"}
      </div>
      <div className="flex-1 text-center text-sm">
        {barn.sensorData?.temperature !== undefined
          ? barn.sensorData.temperature + " °C"
          : "-"}
      </div>
      <div className="flex-1 text-center text-sm">
        {barn.sensorData?.createdAt
          ? dayjs(barn.sensorData.createdAt).format("DD.MM.YYYY HH:mm")
          : "-"}
      </div>
    </div>
  );
}
