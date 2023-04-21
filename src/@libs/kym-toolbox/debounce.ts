const debounce = (fn: (...args: any[]) => any, time: number) => {
  let timer: NodeJS.Timeout;

  const debounced = (...rest: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(fn, rest), time);
  };

  debounced.clear = () => {
    clearTimeout(timer);
  };

  return debounced;
};

export default debounce;
