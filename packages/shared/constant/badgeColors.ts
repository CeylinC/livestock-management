import { saleCategory } from "../enums"
import { gender } from "../enums/gender"

export const BadgeColors = {
  [gender.female]: {
    text: "white",
    bg: "#E91E63"
  },
  [gender.male]: {
    text: "white",
    bg: "#2196F3"
  },
  [gender.karma]: {
    text: "white",
    bg: "#FF9800"
  },
  ["PREGNANT"]: {
    text: "white",
    bg: "#9C27B0"
  },
  [saleCategory.agriculture]: {
    text: "white",
    bg: "#4CAF50"
  },
  [saleCategory.animal]: {
    text: "white",
    bg: "#795548"
  },
  [saleCategory.animalProduct]: {
    text: "white",
    bg: "#FF5722"
  },
  [saleCategory.equipment]: {
    text: "white",
    bg: "#607D8B"
  },
  [saleCategory.feed]: {
    text: "white",
    bg: "#8BC34A"
  },
  [saleCategory.fertilizer]: {
    text: "white",
    bg: "#CDDC39"
  },
  [saleCategory.medicine]: {
    text: "white",
    bg: "#03A9F4"
  },
}
