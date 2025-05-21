import { SessionData } from "@/libs/api/types/auth";

import { atom } from "recoil";

export const userState = atom<Partial<SessionData>>({
  key: "userState",
  default: {},
});


