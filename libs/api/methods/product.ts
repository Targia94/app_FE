import client from "../client";
import type { MultipleData, Params } from "../types";

import type { PotxtProductDataDb, ProductDataDb } from "../types/product";

// Get Many Product

export const getManyProductsAPI = (params: Params) => {
  return client.request<MultipleData<ProductDataDb>>({
    action: "getManyProducts",
    body: {
      filters: params.filters,
      pagination: params.pagination
    },
  });
}

export const getManyPoTxtProducts = (params: Params) => {
  return client.request<MultipleData<PotxtProductDataDb>>({
    action: "getPoTxt",
    body: {
      filters: params.filters,
      pagination: params.pagination
    },
  });
}
