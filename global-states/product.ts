import { ProductDataDb } from "@/libs/api/types/product";
import { atom } from "recoil";

export const productState = atom<ProductDataDb[]>({
    key: "productState",
    default: [],
  });