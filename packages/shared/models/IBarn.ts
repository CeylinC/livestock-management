import { Dayjs } from "dayjs";
import { gender } from "../enums/gender";
import { animalTypes } from "../enums/animalTypes";

export interface IBarn {
  id: string;
  name: string;
  type: animalTypes;
  gender: gender;
  createdAt?: Dayjs;
  sensorData?: ISensorData;
}

export interface ISensorData {
  water: boolean;
  weight: number;
  humidity: number;
  temperature: number;
  createdAt?: Dayjs;
}
