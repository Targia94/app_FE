# TanStack React Query

## Dependencies

- `@tanstack/react-query`
- `@tanstack/eslint-plugin-query`

## Setup

- Create a client using `new QueryClient` class instance.
- Wrap your `_app.tsx` with `QueryClientProvider` and pass the newly QueryClient.

## Query Basics

> Subscribe to the query event in order to get data from server

Possible params:

- _queryKey_: pass a unique key for refetching, caching, and sharing your queries throughout your application. You can pass more using an array.
- _queryFn_: pass a function that returns a promise (e.g.: fetch, axios).

The result object returns a few important states:

- _isPending_: the query has no data yet.
- _isError_: the query encountered an error.
- _error_: all the information about the error encountered.
- _isSuccess_: the query was successful and the data is available.
- _data_: all the data returned from the query.
- _isFetching_: in any state, if the query is fetching at any time (including background refetching).
- _status_: if don't want to use all the above booleans, you can use this that returns a string like "pending", "error", etc.
- _fetchStatus_: the same goes for isFetching boolean, you can return a string with "fetching", "paused" and "idle" status.
- _refetch_: a method used to manually trigger the query to fetch.

## Parallel Queries

All `useQuery` used inside a component, are executed in parallel, to maximize fetching concurrency.

If you need to "map" dinymalically some queries, you cannot do it with use-hooks because it violates the rules of hooks. Instead you can use `useQueries` and pass an array of options object (queryKey + queryFn).

## Lazy/Dependent Query

You can enable or disable a query execution using `enabled` property, along with queryKey and queryFn.  
An example can be `enabled: !!userId` when userId doesn't exist yet (null).

If you want to manually execute the query, you can always `enabled: false` and use `refetch` method offered from useQuery.

You can pass a React state to dinamically execute/disabled the query.

If you are using disabled or lazy queries, you can use the `isLoading` flag instead. It's a derived flag that is computed from: `isPending && isFetching`

## Retry Queries

You can put the `retry` flag inside query options, and can be a number of times, true if infinite, or custom logic with a callback. The retry will request 'n' times before the error is displayed.

## Paginated Queries

The UI jumps in and out of the success and pending states because each new page is treated like a brand new query.  
You can use placeholderData to avoid this problem.

Import `keepPreviousData` from react-query, and use it as query option `placeholderData`. A flag `isPlaceholderData` will be available.

When the new data arrives, the previous data is seamlessly swapped to show the new data.

## Infinite Queries

Useful for rendering additively data like "load more" or infinite scroll. The use-hook is called `useInfiniteQuery`.

Check [docs](https://tanstack.com/query/latest/docs/framework/react/guides/infinite-queries) to learn the uses and how the objects work compared to `useQuery`.

## Mutation

Until now we treated only fetching data from database. If you want to send new data and eventually invalidate the useQuery associated, you need to import `useMutation` hook.

It accepts a `mutationFn`, that is called when you call `mutate` method (remember that is an asynchronous function). Even if it's asynchronous, it won't return a Promise. If you want to return a Promise, use `mutateAsync`.

If you want to clear the error or data, you can use `reset` method.

All the other states are available inside useMutation hook, with the addition of `isIdle` when is currently idle or in a fresh/reset state.

There are available also method `onSuccess`, `onSettled`, `onError` as query options.

## Invalidate queries

Sometimes you need to reset query cache by invalidating them, using `invalidateQueries` available on `useQueryClient`.

If you call it without params, every cache will be invalidate. If you pass `queryKey` array, you can invalidate a specific one.

If you don't pass the `exact` option, every sub-key cache will be invalidated.

A good practice can be calling it on `onSuccess` callback of `useMutation`, otherwise the stored data will be the previous one.

## Update queries

You can set query data with `setQueryData` available on `useQueryClient`. Instead of invalidating cache, you can update it with newly data updated with `useMutation`.

A good practice can be calling it on `onSuccess` callback of `useMutation`, otherwise the stored data will be the previous one.

Remember that the data is immutable, you must create a new object if you want to change something.

## Abort/cancel queries

You can use `signal` param on the `queryFn` function, and pass it on fetch/axios call, to "connect" your HTTP request with React Query logic. If the query is cancelled or aborted, the HTTP request will be cancelled/aborted as well.

You can cancel them manually using the method `cancelQueries` available on `useQueryClient`.

## Server Rendering & Hydration

[Next.js Pages Routes example](https://tanstack.com/query/latest/docs/framework/react/guides/ssr#full-nextjs-pages-router-example)

## Examples/Guides

- [Basic Query](https://tanstack.com/query/latest/docs/framework/react/guides/caching#:~:text=Simple-,Basic,-Basic%20w/%20GraphQL)
- [Pagination](<https://tanstack.com/query/latest/docs/framework/react/guides/caching#:~:text=Optimistic%20Updates%20(Cache)-,Pagination,-Load%2DMore%20%26%20Infinite>)
- [Load More & Infinite Scroll](https://tanstack.com/query/latest/docs/framework/react/examples/load-more-infinite-scroll)
- [Next.js](https://tanstack.com/query/latest/docs/framework/react/examples/nextjs)
