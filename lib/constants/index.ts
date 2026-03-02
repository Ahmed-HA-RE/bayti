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
export const STEPS = [
  {
    title: 'Explore Our Properties',
    description:
      'Browse our curated selection of premium properties across the UAE for sale and rent.',
    image: '/images/step-1.jpg',
  },
  {
    title: 'Meet and Schedule',
    description:
      'Connect with an agent to discuss properties and schedule your preferred viewing time.',
    image: '/images/step-2.jpg',
  },
  {
    title: 'Finalize with Confidence',
    description:
      'Secure your chosen property and complete the process with expert guidance every step.',
    image: '/images/step-3.jpg',
  },
];
