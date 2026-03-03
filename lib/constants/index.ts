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
