import client from "../client";
import { MultipleData, Params } from "../types";
import { ApproveItem } from "../types/approveItme";
import { Ordine } from "../types/order";
import { PickUpItem } from "../types/pickUpItem";


// Move To Location
export const createOrderAPI = (body: any) => {
  return client.request({
    action: "createOrder",
    body,
    
  });
}

export const getOrder = (params: Params) => {
  return client.request<MultipleData<Ordine>>({
    action: "getOrder",
    body: params,
  });
}

export const getApprovationOrder = (params: Params) => {
  return client.request<MultipleData<Ordine>>({
    action: "getOrderApprove",
    body: params,
  });
}

export const getOrdersToPickUp = (params: Params) => {
  return client.request<MultipleData<Ordine>>({
    action: "getOrdersToPickUp",
    body: params,
  });
}


export const changeStatus = (params: Params) => {
  return client.request({
    action: "changeStatus",
    body: params,
  });
}

export const approveItem = (body: any) => {
  return client.request<ApproveItem>({
    action: "approveItem",
    body,
  });
}

export const pickUpItem = (body: any) => {
  return client.request<PickUpItem>({
    action: "pickUp",
    body,
  });
}


export const closeOrder = (body: any) => {
  return client.request({
    action: "closePickUp",
    body,
  });
}

export const deleteOrder = (params: Params) => {
  return client.request({
    action: "deleteOrder",
    queryParams: params,
  });
}

export const exportStory = (body: Params) => {
  return client.request({
    action: "exportStory",
    body
  });
}