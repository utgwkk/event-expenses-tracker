import { atom } from "recoil";
import { Expense } from "../types";
import { persistToLocalStorage } from "./localStorage";
import { isReadonly } from "../readonly";

export const expensesAtom = atom<Expense[]>({
  key: "expenses",
  default: [],
  effects: isReadonly() ? [] : [persistToLocalStorage],
});
