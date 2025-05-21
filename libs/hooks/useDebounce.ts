import { useCallback, useMemo, useState } from "react";
import { debounce } from "../utils/optimization";

export function useDebounce<T>(initState: T, delay?: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(initState);
  const [asyncValue, setAsyncValue] = useState<T>(initState);

  const debouncedFunction = useMemo(() => {
    return debounce((value: T) => {
      setDebouncedValue(value);
    }, delay ?? 500);
  }, []); //eslint-disable-line

  const setValue = useCallback((value: T) => {
    setAsyncValue(value);
    debouncedFunction(value)
  }, []) // eslint-disable-line

  return [
    asyncValue, setValue, debouncedValue
  ] as const
} 