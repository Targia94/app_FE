import type { Method } from "../types";

type MethodNoOp = (endpoint: Method["endpoint"], error?: string) => Method;

export const GET: MethodNoOp = (endpoint, error) => ({
  operation: "GET",
  endpoint,
  error
});

export const POST: MethodNoOp = (endpoint, error) => ({
  operation: "POST",
  endpoint,
  error
});

export const PUT: MethodNoOp = (endpoint, error) => ({
  operation: "PUT",
  endpoint,
  error
});

export const DELETE: MethodNoOp = (endpoint, error) => ({
  operation: "DELETE",
  endpoint,
  error
});
