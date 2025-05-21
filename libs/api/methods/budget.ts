import { DataItem } from "@/components/budget"
import client from "../client"
import { MultipleData, Params } from "../types"
import { Budget, HistoryPlot } from "../types/budget"
import { Legend } from "../types/gl-account"

export const insertMonth = (body: Params) => {
    return client.request({
      action: 'insertMonth',
      body,
    })
}

export const getGraphic = (body: Params) => {
  return client.request<DataItem[]>({
    action: 'getGraphic',
    body,
  })
}

export const updBudget = (body: Params) => {
    return client.request({
      action: 'updBudget',
      body,
    })
}

export const getHistory = (params: Params) => {
  return client.request<MultipleData<HistoryPlot>>({
    action: 'getHistory',
    body: {
      filters: params.filters,
      pagination: params.pagination,
    },
  })
}

export const updMonth = (body: any) => {
  return client.request({
    action: 'updMonth',
    body,
  })
}

export const getBudget = (queryParams: Params) => {
  return client.request<Budget[]>({
    action: 'getBudget',
    queryParams,
  })
}

export const deleteMonth = (queryParams: Params) => {
  return client.request({
    action: 'deleteMonth',
    queryParams,
  })
}

export const getLastHistory = (queryParams?: Params) => {
  return client.request({
    action: 'getLastHistory',
    queryParams,
  })
}

export const legend = (queryParams?: Params) => {
  return client.request<Legend>({
    action: 'legend',
    queryParams,
  })
}