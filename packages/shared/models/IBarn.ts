import { Dayjs } from "dayjs";
import { gender } from "../enums/gender";
import { animalTypes } from "../enums/animalTypes";

export interface IBarn {
  id: string;
  name: string;
  type: animalTypes;
  gender: gender;
  createdAt?: Dayjs;
}
