import { parseAsString, debounce, useQueryStates, parseAsInteger } from 'nuqs';

export const useFilters = () => {
  return useQueryStates({
    search: parseAsString.withDefault('').withOptions({
      shallow: false,
      limitUrlUpdates: debounce(300),
    }),
    location: parseAsString.withDefault('').withOptions({
      shallow: false,
    }),
    type: parseAsString.withOptions({ shallow: false }).withDefault(''),
    listType: parseAsString.withOptions({ shallow: false }).withDefault(''),
    price: parseAsString.withOptions({ shallow: false }).withDefault(''),
    status: parseAsString.withOptions({ shallow: false }).withDefault(''),
    date: parseAsString.withOptions({ shallow: false }).withDefault(''),
    sort: parseAsString.withOptions({ shallow: false }).withDefault(''),
    page: parseAsInteger.withDefault(1).withOptions({ shallow: false }),
  });
};
