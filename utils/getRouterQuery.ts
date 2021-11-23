import { ParsedUrlQuery } from 'querystring';

const getRouterQuery = (
  query: ParsedUrlQuery | undefined,
  field: string
): string => {
  const value = query && query[field];
  return value ? value.toString() : '';
};

export { getRouterQuery };
