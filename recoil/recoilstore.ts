"use client";

import { atom } from "recoil";
export const feedstate = atom({
  key: "feedstate",
  default: null,
});

export const tokenState = atom({
  key: "tokenState",
  default: "",
});

export const playState = atom({
  key: "playState",
  default: "",
});

export const activemusicform = atom({
  key: "activemusicform",
  default: true,
});

export const activenicknameform = atom({
  key: "activenicknameform",
  default: true,
});

export const activewithdrawform = atom({
  key: "activewithdrawform",
  default: true,
});
