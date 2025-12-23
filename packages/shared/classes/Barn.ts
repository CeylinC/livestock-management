import { animalTypes } from "../enums/animalTypes";
import { gender } from "../enums/gender";
import { IBarn, ISensorData } from "../models/IBarn";
import dayjs from "dayjs";

export class Barn implements IBarn {
  id: string;
  name: string;
  type: animalTypes;
  gender: gender;
  sensorData?: ISensorData;

  constructor(data?: any) {
    this.id = data?.id || "";
    this.name = data?.name || "";
    this.type = data?.type || "";
    this.gender = data?.gender || gender.karma;

    if (data?.sensor_datas) {
      this.sensorData = {
        water: data.sensor_datas.water ?? false,
        weight: data.sensor_datas.weight ?? 0,
        humidity: data.sensor_datas.humidity ?? 0,
        temperature: data.sensor_datas.temperature ?? 0,
        createdAt: data.sensor_datas.sent_at
          ? dayjs(data.sensor_datas.sent_at)
          : undefined,
      };
    } else {
      this.sensorData = undefined;
    }
  }
}
