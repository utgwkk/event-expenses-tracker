import { atom } from "recoil";
import { Expense } from "../types";
import { persistToLocalStorage } from "./localStorage";
import { isReadonly } from "../readonly";
import { parseShareUrl } from "../shareUrl";

export const expensesAtom = atom<Expense[]>({
  key: "expenses",
  default: parseShareUrl(location.hash.substring(1)),
  effects: isReadonly() ? [] : [persistToLocalStorage],
});
