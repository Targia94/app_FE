import client from "../client";
import { MultipleData, Params } from "../types";
import { Richiesta } from "../types/richiesta";

export const createNewRequest = (body: any) => {
  return client.request({
    action: "newRequest",
    body,
  });
};

export const getRequest = (params: Params) => {
  return client.request<MultipleData<Richiesta>>({
    action: "getRequest",
    body: {
      filters: params.filters,
      pagination: params.pagination,
    },
  });
};

export const getRequestPrc = (params: Params) => {
  return client.request<MultipleData<Richiesta>>({
    action: "getRequestPrc",
    body: {
      filters: params.filters,
      pagination: params.pagination,
    },
  });
};

export const getSingleRequest = (queryParams: Params) => {
  return client.request<Richiesta>({
    action: "getSingleRequest",
    queryParams,
  });
};

/* export const deleteRequest = (params: Params) => {
  return client.request({
    action: "deleteRequest",
    queryParams: params,
  });
}; */

export const uploadAllegatiRichiesta = (params: Params, body: Params) => {
  return client.request({
    action: "uploaAllegatiRichiesta",
    queryParams: params,
    body,
  });
};

export const cambiaStato = (body: Params) => {
  return client.request({
    action: "cambiaStato",
    body,
  });
};

export const updateRequest = (body: Params) => {
  return client.request({
    action: "updateRequest",
    body,
  });
};

export const sendEmail = (params: Params) => {
  return client.request({
    action: "sendEmail",
    queryParams: params,
  });
};
