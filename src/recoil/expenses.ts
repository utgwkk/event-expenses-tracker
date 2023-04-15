import { atom } from "recoil";
import { Expense } from "../types";
import { persistToLocalStorage } from "./localStorage";

export const expensesAtom = atom<Expense[]>({
  key: "expenses",
  default: [],
  effects: [persistToLocalStorage],
});
