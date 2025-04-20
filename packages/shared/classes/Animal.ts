import { Dayjs } from "dayjs";
import { gender } from "../enums";
import { IAnimal } from "../models";
import dayjs from "dayjs";
import { animalTypes } from "../enums/animalTypes";

export class Animal implements IAnimal {
  id: string;
  name: string;
  earring: string;
  type: animalTypes;
  genus: string;
  gender: gender;
  birthday: Dayjs;
  barnName: string;
  weight: number;
  isPregnant: boolean;
  createdAt?: Dayjs | undefined;

  constructor(data?: any) {
    this.id = data?.id || "";
    this.name = data?.name || "";
    this.earring = data?.earring || "";
    this.type = data?.type || "";
    this.genus = data?.genus || "";
    this.gender = data?.gender || gender.male;
    this.birthday = dayjs(data?.birthday);
    this.barnName = data?.barnName || "";
    this.weight = data?.weight || 0;
    this.isPregnant = data?.isPregnant || false;
  }
}
