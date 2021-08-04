export const manipulateSearchParams = (paramObject: any): string => {
  let queryParams = '?';
  for (const key in paramObject) {
    if (!paramObject[key]) continue;
    queryParams += `${key}=${paramObject[key]}&`;
  }
  return queryParams;
};
