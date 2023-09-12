import { atom } from "recoil";
export const feedstate = atom({
  key: "feedstate",
  default: null,
});

export const tokenState = atom({
  key: "tokenState",
  default: null,
});

export const playState = atom({
  key: "playState",
  default: "",
});
