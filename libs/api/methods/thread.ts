import client from "../client"
import { Params } from "../types"
import { ThreadRichieste } from "../types/threadRichiesta"

export const getThreads = (params: Params) => {
    return client.request<ThreadRichieste[]>({
      action: 'getThreads',
      body: {
        filters: params.filters,
        pagination: params.pagination,
      },
    })
}

export const insertThread = (body: Params) => {
    return client.request({
      action: 'insertThread',
      body,
    })
}

export const insertAllegatoThread = (body: Params) => {
  return client.request({
    action: 'insertAllegatoThread',
    body,
  })
}