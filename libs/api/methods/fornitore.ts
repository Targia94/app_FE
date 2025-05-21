import client from '../client'
import { Params, MultipleData } from '../types'
import { Fornitore } from '../types/fornitore'

export const getFornitori = (params: Params) => {
  return client.request<MultipleData<Fornitore>>({
    action: 'getFornitore',
    body: {
      filters: params.filters,
      pagination: params.pagination,
    },
  })
}
export const insertFornitore = (body: Params) => {
  return client.request<Fornitore>({
    action: 'insertFornitore',
    body,
  })
}

export const deleteFornitore = (queryParams?: Params) => {
  return client.request({
    action: 'deleteFornitore',
    queryParams,
  })
}

export const updateFornitore = (body: Params) => {
  return client.request<Fornitore>({
    action: 'updateFornitore',
    body,
  })
}
