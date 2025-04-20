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
    bg: "#03A791"
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
    bg: "#FFA55D"
  },
  [saleCategory.fertilizer]: {
    text: "white",
    bg: "#795548"
  },
  [saleCategory.medicine]: {
    text: "white",
    bg: "#03A9F4"
  },
}
