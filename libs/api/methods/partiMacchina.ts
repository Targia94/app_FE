import client from '../client'
import { Params, MultipleData } from '../types'
import {  NotePartiMacchina, ParteMacchina, PartiMacchina } from '../types/parti_macchina'

export const getPartiMacchina = (params: Params) => {
  return client.request<MultipleData<PartiMacchina>>({
    action: 'getPartiMacchina',
    body: {
      filters: params.filters,
      pagination: params.pagination,
    },
  })
}
export const insertParteMacchina = (body: Params) => {
  return client.request<PartiMacchina>({
    action: 'insertParteMacchina',
    body,
  })
}

export const deleteParteMacchina = (queryParams?: Params) => {
  return client.request({
    action: 'deleteParteMacchina',
    queryParams,
  })
}

export const updateParteMacchina = (body: Params) => {
  return client.request<PartiMacchina>({
    action: 'updateParteMacchina',
    body,
  })
}

export const getNoteParteMacchina = (params: Params) => {
  return client.request<NotePartiMacchina>({
    action: 'getNoteParteMacchina',
    urlParams: { id_parte: params.id_parte },
  })
}

export const insertNotaParteMacchina = (body: Params) => {
  return client.request({
    action: 'insertNotaParteMacchina',
    body:{
      id_parte_macchina: body.id_parte_macchina,
      nota: body.nota
    },
  })
}

export const getLinkParteMacchina = (params: Params) => {
  return client.request<ParteMacchina[]>({
    action: 'getLinkParteMacchina',
  })
}