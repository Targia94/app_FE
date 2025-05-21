import axios from "axios";

import type { MethodMap, Params, Request, Response } from "./types";

export default class ClientApi<M extends MethodMap> {
  baseURL: string;
  methods: M;

  constructor(baseURL: string, methods: M) {
    this.baseURL = baseURL;
    this.methods = methods;
  }

  serializeParams(params?: Params) {
    const serializedParams: Record<string, string> = {};
    for (const key in params)
      if (params[key] !== null && params[key] !== undefined)
        serializedParams[key] = `${params[key]}`;
    return Object.keys(serializedParams).length > 0 ? serializedParams : null;
  }

  formatUrl(endpoint: string, urlParams?: Params, queryParams?: Params) {
    const uParams = this.serializeParams(urlParams);
    for (const key in uParams)
      endpoint = endpoint.replace(`{${key}}`, uParams[key]);

    const qParams = this.serializeParams(queryParams);
    if (qParams) endpoint += "?" + new URLSearchParams(qParams);

    return this.baseURL + endpoint;
  }

  async request<T = any>(req: Request<M>) {
    const method = this.methods[req.action];

    try {
      const url = this.formatUrl(
        method.endpoint,
        req.urlParams,
        req.queryParams
      );

      const res = await axios<any, Response<T>>({
        method: method.operation,
        url,
        data: req.body,
        headers: {
          ...req.headers,
          "X-Forwarded-Proto": "https",
        },
        withCredentials: true,
      });
      return {
        response: res.data,
        status: res.status,
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Handle Axios error with a response
        const { data, status } = error.response;
        throw {
          message: method.error ?? "Errore generico. Riprovare.",
          response: data,
          status,
        };
      } else {
        // Handle generic or network error
        throw {
          message: method.error ?? "Errore generico. Riprovare.",
          response: null,
          status: null,
        };
      }
    }
  }
}
