import { Dayjs } from "dayjs";
import { gender } from "../enums";
import { animalTypes } from "../enums/animalTypes";

export interface IAnimal{
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
    createdAt?: Dayjs;
}