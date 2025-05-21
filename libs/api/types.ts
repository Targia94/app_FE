import type { AxiosRequestConfig, Method as Operation } from "axios";

export type Params = Record<
  string,
  string | number | boolean | FormData | null | undefined | object | [object] | FormData
>;

/**
 * Methods
 */

export type Method = {
  endpoint: `/${string}`;
  operation: Uppercase<Operation>;
  error?: string;
}

export type MethodMap = {
  [key: string]: Method;
}

/**
 * Request & Response
 */

export type Request<M extends MethodMap> = {
  action: keyof M;
  headers?: AxiosRequestConfig["headers"];
  body?: Params | string ;
  urlParams?: Params;
  queryParams?: Params;
}

export type Response<T> = {
  config: any;
  data: T;
  headers: AxiosRequestConfig["headers"];
  request: any;
  status: number;
  statusText: string;
}

/**
 * Result
 */

export type ClientApiResult<T> = {
  response: T,
  status: number
};

export type MultipleData<T> = {
  data: T[];
  totalPages: number;
  totalCount: number;
}