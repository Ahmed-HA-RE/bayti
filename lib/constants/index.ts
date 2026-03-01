export const SERVER_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_PROD_URL
    : process.env.NEXT_PUBLIC_DEV_URL;

export const APP_NAME = 'Bayti';

export const STATISTICS = [
  { value: '350+', label: 'Premium Properties' },
  { value: '1200+', label: 'Happy Clients' },
  { value: '5+', label: 'UAE Cities Covered' },
  { value: '250+', label: 'Luxury Apartments' },
  { value: '50+', label: 'Villas Sold' },
  { value: '15+', label: 'Years of Experience' },
];
