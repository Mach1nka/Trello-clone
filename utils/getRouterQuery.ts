import { ParsedUrlQuery } from 'querystring';

const getRouterQuery = (query: ParsedUrlQuery, field: string): string => {
  const value = query[field];
  return value ? value.toString() : '';
};

export { getRouterQuery };
