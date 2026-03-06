import { FaSwimmingPool } from 'react-icons/fa';
import { GiHomeGarage } from 'react-icons/gi';
import { PiSecurityCameraFill } from 'react-icons/pi';
import { LuFence } from 'react-icons/lu';
import { TbTableRow } from 'react-icons/tb';
import { LuProjector } from 'react-icons/lu';
import { RiSmartphoneFill } from 'react-icons/ri';
import { BiCloset } from 'react-icons/bi';
import { GiBroom } from 'react-icons/gi';
import { BsDoorOpenFill, BsCloudSun } from 'react-icons/bs';
import { MdOutlineOutdoorGrill } from 'react-icons/md';
import { LiaHotTubSolid } from 'react-icons/lia';
import { PiThermometerHotFill } from 'react-icons/pi';
import { PiDesk } from 'react-icons/pi';
import { CgGym } from 'react-icons/cg';
import { GiElevator } from 'react-icons/gi';

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

export const AMENITIES = [
  {
    name: 'privatePool',
    icon: FaSwimmingPool,
    title: 'Private Pool',
  },
  {
    name: 'garage',
    icon: GiHomeGarage,
    title: 'Garage',
  },
  {
    name: 'security',
    icon: PiSecurityCameraFill,
    title: '24/7 Security',
  },
  {
    name: 'garden',
    icon: LuFence,
    title: 'Garden',
  },
  {
    name: 'outdoorKitchen',
    icon: TbTableRow,
    title: 'Outdoor Kitchen',
  },
  {
    name: 'cinemaRoom',
    icon: LuProjector,
    title: 'Cinema Room',
  },
  {
    name: 'smartHome',
    icon: RiSmartphoneFill,
    title: 'Smart Home',
  },
  {
    name: 'walkInCloset',
    icon: BiCloset,
    title: 'Walk-in Closet',
  },
  {
    name: 'maidRoom',
    icon: GiBroom,
    title: 'Maid Room',
  },
  {
    name: 'Driver Room',
    icon: BsDoorOpenFill,
    title: 'Driver Room',
  },
  {
    name: 'rooftopTerrace',
    icon: BsCloudSun,
    title: 'Rooftop Terrace',
  },
  {
    name: 'bbqArea',
    icon: MdOutlineOutdoorGrill,
    title: 'BBQ Area',
  },
  {
    name: 'jacuzzi',
    icon: LiaHotTubSolid,
    title: 'Jacuzzi',
  },
  {
    name: 'sauna',
    icon: PiThermometerHotFill,
    title: 'Sauna',
  },
  {
    name: 'homeOffice',
    icon: PiDesk,
    title: 'Home Office',
  },
  {
    name: 'gym',
    icon: CgGym,
    title: 'Gym',
  },
  {
    name: 'privateElevator',
    icon: GiElevator,
    title: 'Private Elevator',
  },
];

export const TESTIMONIALS = {
  Row_1: [
    {
      name: 'Michael Roberts',
      image: '/images/testimonials/testimonial-1.jpg',
      username: 'michaelroberts',
      feedback:
        'The entire buying experience was handled with exceptional professionalism. From the first viewing to the final transfer, everything was organized perfectly. The team understood exactly what my family needed and helped us secure a beachfront villa that truly feels like home.',
      social: 'threads',
    },
    {
      name: 'Alex Johnson',
      image: '/images/testimonials/testimonial-2.jpg',
      username: 'alexjohnson',
      feedback:
        'I appreciated how transparent and honest the process was. Every detail was explained clearly, and scheduling viewings was incredibly smooth. The townhouse matched everything we discussed, and the transition into ownership felt simple and well managed.',
      social: 'facebook',
    },
    {
      image: '/images/testimonials/testimonial-7.jpg',
      username: 'robertsmith',
      feedback:
        'Finding a family home is about comfort and memories. Viewing with my son was special, and the team ensured every detail fit our needs.',
      social: 'instagram',
      type: 'primary',
    },
  ],
  Row_2: [
    {
      name: 'John Doe',
      image: '/images/testimonials/testimonial-3.jpg',
      username: 'johndoe',
      feedback:
        'The professionalism and responsiveness exceeded my expectations. Property options were carefully curated instead of overwhelming listings, which saved significant time. The villa perfectly suits both investment and long-term living goals.',
      social: 'linkedin',
    },
    {
      name: 'Michael Weber',
      image: '/images/testimonials/testimonial-4.jpg',
      username: 'michaelweber',
      feedback:
        'Relocating to the UAE came with many uncertainties, but the experience of finding my penthouse was seamless. Communication was always clear, and every step was handled efficiently. I felt supported from the first inquiry until receiving the keys.',
      social: 'threads',
    },
    {
      image: '/images/testimonials/testimonial-8.jpg',
      username: 'jameswalker',
      feedback:
        'The process was smooth, my family felt supported, and my son immediately loved the neighborhood.',
      social: 'facebook',
      type: 'primary',
    },
  ],
  Row_3: [
    {
      name: 'Khaled Darwish',
      image: '/images/testimonials/testimonial-5.jpg',
      username: 'khaleddarwish',
      feedback:
        'What stood out most was the level of attention given to my requirements. The smart home features, location, and layout were exactly what I wanted. The guidance throughout negotiation and closing gave me full confidence in my investment decision.',
      social: 'threads',
    },
    {
      image: '/images/testimonials/testimonial-6.jpg',
      username: 'alexcold',
      feedback:
        'A smooth and confident experience finding the perfect home in Dubai.',
      social: 'facebook',
      type: 'primary',
    },
  ],
};

export const PROPERTY_TYPES = [
  { name: 'Apartment', value: 'apartment' },
  { name: 'Villa', value: 'villa' },
  { name: 'Townhouse', value: 'townhouse' },
  { name: 'Penthouse', value: 'penthouse' },
  { name: 'Duplex', value: 'duplex' },
  { name: 'Studio', value: 'studio' },
  { name: 'Traditional Home', value: 'traditional_home' },
  { name: 'Luxury Property', value: 'luxury_property' },
];

export const PROPERTY_CITIES = [
  { name: 'Dubai', value: 'dubai' },
  { name: 'Abu Dhabi', value: 'abu_dhabi' },
  { name: 'Sharjah', value: 'sharjah' },
  { name: 'Ajman', value: 'ajman' },
  { name: 'Ras Al Khaimah', value: 'ras_al_khaimah' },
  { name: 'Fujairah', value: 'fujairah' },
  { name: 'Umm Al Quwain', value: 'umm_al_quwain' },
];

export const PROPERTY_PRICE_RANGES = [
  { name: 'Under AED 10K', value: '0-10000' },
  { name: 'AED 10K - 50K', value: '10000-50000' },
  { name: 'AED 50K - 100K', value: '50000-100000' },
  { name: 'AED 100K - 500K', value: '100000-500000' },
  { name: 'AED 500K - 1M', value: '500000-1000000' },
  { name: 'Above AED 1M', value: '1000000' },
];

export const PROPERTY_LIST_TYPES = [
  { name: 'For Sale', value: 'SALE' },
  { name: 'For Rent', value: 'RENT' },
];

export const FAQS = [
  {
    question: 'What type of properties are availabe on Bayti?',
    answer:
      'Bayti offers a wide range of premium properties across the UAE, including apartments, villas, townhouses, penthouses, duplexes, studios, traditional homes, and luxury properties. Whether you are looking for a cozy apartment or a spacious villa, we have options to suit every preference and lifestyle.',
  },
  {
    question: 'What kind of customer support does Bayti offer?',
    answer:
      'Bayti offers 24/7 customer support. Whether you have questions about a property, need assistance with scheduling a viewing, or require help during the buying or renting process, our dedicated support team is always available to assist you promptly and efficiently.',
  },
  {
    question: 'How can I schedule a property viewing?',
    answer:
      'You can schedule a property viewing by logging to your account, selecting the property you are interested in, and clicking on the "Schedule Viewing" button. You can choose a convenient date and time for the viewing, pay a small fee so we can confirm the appointment, and our team will be in touch to confirm the details.',
  },
  {
    question: 'How secure are transactions on Bayti?',
    answer:
      'Bayti ensures secure transactions through encrypted payment gateways and strict verification processes. Your personal and financial information is protected at all times, providing a safe and trustworthy environment for all property transactions.',
  },
  {
    question: 'What happens after I reserve a property viewing?',
    answer:
      'Once you reserve a property viewing on Bayti, our clients will review and confirm your appointment. You will receive a confirmation with the selected date and time, along with the property details. On the scheduled day, you can visit the property with our team and explore it in person before making any further decisions.',
  },
  {
    question: 'How long is a property reservation valid?',
    answer:
      'A property viewing reservation on Bayti is valid for 24 hours. This reservation temporarily secures your viewing slot and prevents scheduling conflicts with other users. If the viewing is not confirmed within that period, the reservation may expire and the time slot will become available again.',
  },
];
