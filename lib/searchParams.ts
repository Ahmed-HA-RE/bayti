import { createLoader, parseAsInteger, parseAsString } from 'nuqs/server';

export const urlParams = {
  search: parseAsString.withDefault(''),
  type: parseAsString.withDefault(''),
  price: parseAsString.withDefault(''),
  location: parseAsString.withDefault(''),
  listType: parseAsString.withDefault(''),
  page: parseAsInteger.withDefault(1),
};

export const loadSearchParams = createLoader(urlParams);
