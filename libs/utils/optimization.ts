export const debounce = (func: Function, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
};

export const throttle = (func: Function, delay: number) => {
  let throttling = false;
  return function (this: any, ...args: any[]) {
    if (!throttling) {
      throttling = true;
      func.apply(this, args);
      setTimeout(() => {
        throttling = false;
      }, delay);
    }
  };
};

export const match = (testo: string, parola: string) => {
  const lowerCaseText = testo.toLowerCase().trim();
  const lowerCaseWord = parola.toLowerCase().trim();

  // Controllo se parola contiene '*'
  if (lowerCaseWord.includes('*')) {
    const subwords = lowerCaseWord.split('*').map(subword => subword.trim());
    const totalChars = lowerCaseText.length;
    let matchedChars = 0;

    for (const subword of subwords) {
      const occurrences = lowerCaseText.split(subword).length - 1;
      matchedChars += occurrences * subword.length;
    }

    const percentage = (matchedChars / totalChars) * 100;
    return parseFloat(percentage.toFixed(1));
  } else {
    const totalChars = lowerCaseText.length;
    // Controllo per evitare divisione per zero
    if (totalChars === 0 || lowerCaseWord.length === 0) {
      return 0;
    }

    const occurrences = lowerCaseText.split(lowerCaseWord).length - 1;
    const matchedChars = occurrences * lowerCaseWord.length;

    const percentage = (matchedChars / totalChars) * 100;
    return parseFloat(percentage.toFixed(1));
  }
};



