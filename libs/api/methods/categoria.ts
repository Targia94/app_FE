import client from '../client'
import { Params, MultipleData } from '../types'
import { Categoria } from '../types/categorie'

export const getCategorie = (params: Params) => {
  return client.request<MultipleData<Categoria>>({
    action: 'getCategorie',
    body: {
      filters: params.filters,
      pagination: params.pagination,
    },
  })
}
export const insertCategoria = (body: Params) => {
  return client.request<Categoria>({
    action: 'insertCategoria',
    body,
  })
}

export const deleteCategoria = (queryParams?: Params) => {
  return client.request({
    action: 'deleteCategoria',
    queryParams,
  })
}

export const updateCategoria = (body: Params) => {
  return client.request<Categoria>({
    action: 'updateCategoria',
    body,
  })
}
