import { atom } from "recoil";
import { Preset } from "../types";
import { persistToLocalStorage } from "./localStorage";

export const presetsAtom = atom<Preset[]>({
  key: "presets",
  default: [],
  effects: [persistToLocalStorage],
});
