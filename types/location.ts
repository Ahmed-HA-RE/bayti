export type LocationResponse = {
  place_id: string;
  display_place: string;
  display_address: string;
  address: {
    state: string;
  };
  lat: number;
  lon: number;
};

export type Location = {
  id: string;
  display_place: string;
  display_address: string;
  city: string;
  latitude: number;
  longitude: number;
};
