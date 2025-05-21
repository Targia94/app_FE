/**
 * **concatenates**, **filters** (non-string and empty string) and **removes duplicates** in classNames
 * @param args classNames
 * @returns one single string with classNames
 */
export const cn = (...args: any[]) => args
  .filter((arg, index, self) => {
    if (typeof arg === "string" && arg)
      return self.indexOf(arg) === index;
  })
  .join(" ")
