export const getSettledData = <T>(res: PromiseSettledResult<{ data: T }>): T | null => {
  return res.status === "fulfilled" ? res.value.data : null;
};

export const getSettledDataApi = <T>(res: PromiseSettledResult<T>): T | null => {
  return res.status === "fulfilled" ? res.value : null;
};
