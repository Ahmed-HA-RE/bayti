import { createLoader, parseAsString } from 'nuqs/server';

export const urlParams = {
  search: parseAsString.withDefault(''),
  type: parseAsString.withDefault(''),
  price: parseAsString.withDefault(''),
  location: parseAsString.withDefault(''),
  listType: parseAsString.withDefault(''),
};

export const loadSearchParams = createLoader(urlParams);
