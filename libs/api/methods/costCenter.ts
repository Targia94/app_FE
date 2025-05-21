// Get Many Product

import client from "../client";
import { MultipleData, Params } from "../types";
import { CdcUser } from "../types/cdcUser";
import { CentriCosto } from "../types/costCenter";
import { CdCRda } from "../types/richiesta";

export const getCentersCost = (params: Params) => {
  return client.request<MultipleData<CentriCosto>>({
    action: "getCentersCost",
    body: {
      filters: params.filters,
      pagination: params.pagination
    },
  });
}

export const getCentersCostRda = (params: Params) => {
  return client.request<MultipleData<CdCRda>>({
    action: "getCentersCostRda",
    body: {
      filters: params.filters,
      pagination: params.pagination
    },
  });
}

export const getCdcNotUser = (queryParams: Params) => {
  return client.request<CentriCosto[]>({
    action: "getCdcNotUser",
    queryParams
  });
}

export const assignCdcUser = (body: Params) => {
  return client.request<CdcUser>({
    action: "assignCdcUser",
    body
  });
}

export const getCdcUser = (queryParams: Params) => {
  return client.request<CentriCosto[]>({
    action: "getCdcUser",
    queryParams
  });
}

export const removeCdcUser = (queryParams: Params) => {
  return client.request({
    action: "removeCdcUser",
    queryParams
  });
}

/* CDC */

export const getCdc= (queryParams?: Params)=>{
  return client.request<CentriCosto[]>({
    action: "getCdcs",
    queryParams
  })
}

export const createCdc = (body: Params) => {
  return client.request<CentriCosto>({
    action: "createCdc",
    body
  });
}

export const createCdcRda = (body: Params) => {
  return client.request({
    action: "newCdcRda",
    body
  });
}

export const removeCdc= (queryParams?: Params)=>{
  return client.request<CentriCosto[]>({
    action: "removeCdc",
    queryParams
  })
}

export const removeCdcRda= (queryParams?: Params)=>{
  return client.request({
    action: "deleteCdcRda",
    queryParams
  })
}

export const modifyCdc = (body: Params) => {
  return client.request<CentriCosto>({
    action: "updateCdc",
    body
  });
}

export const modifyCdcRda = (body: Params) => {
  return client.request<CdCRda>({
    action: "updateCdcRda",
    body
  });
}

export const activeCdc = (body: Params) => {
  return client.request<CentriCosto>({
    action: "activeCdc",
    body
  });
}