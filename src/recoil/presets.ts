import { atom } from "recoil";
import { Preset } from "../types";
import { persistToLocalStorage } from "./localStorage";
import { isReadonly } from "../readonly";

export const presetsAtom = atom<Preset[]>({
  key: "presets",
  default: [],
  effects: isReadonly() ? [] : [persistToLocalStorage],
});
