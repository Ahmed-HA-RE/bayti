import { Location, LocationResponse } from '@/types/location';

export const getLocations = async (search: string): Promise<Location[]> => {
  const locationIqApiKey = process.env.NEXT_PUBLIC_LOCATIONIQ_API_TOKEN;
  const response = await fetch(
    `https://api.locationiq.com/v1/autocomplete?key=${locationIqApiKey}&q=${search}&countrycodes=AE&format=json&limit=5&normalizecity=1&tag=highway`,
  );

  const data = await response.json();

  // Customize the response to only include necessary fields
  const customizedData: Location[] = data.map((location: LocationResponse) => ({
    id: location.place_id,
    display_place: location.display_place,
    display_address: location.display_address,
    city: location.address.state,
    latitude: location.lat,
    longitude: location.lon,
  }));

  return customizedData;
};
