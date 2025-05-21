import client from '../client'
import { Params, MultipleData } from '../types'
import { GLAccount } from '../types/gl-account'

export const getGlAccounts = (params: Params) => {
  return client.request<MultipleData<GLAccount>>({
    action: 'getGlAccount',
    body: {
      filters: params.filters,
      pagination: params.pagination,
    },
  })
}
export const insertGlAccount = (body: Params) => {
  return client.request<GLAccount>({
    action: 'insertGlAccount',
    body,
  })
}

export const deleteGlAccount = (queryParams?: Params) => {
  return client.request({
    action: 'deleteGlAccount',
    queryParams,
  })
}

export const updateGlAccount = (body: Params) => {
  return client.request<GLAccount>({
    action: 'updateGlAccount',
    body,
  })
}
