import { FaRegFileAlt, FaSwimmingPool, FaDropbox } from 'react-icons/fa';
import { GiHomeGarage } from 'react-icons/gi';
import { PiChartLineUp, PiSecurityCameraFill } from 'react-icons/pi';
import { LuFence, LuUser, LuUsers } from 'react-icons/lu';
import { TbTableRow } from 'react-icons/tb';
import { LuProjector } from 'react-icons/lu';
import { RiSmartphoneFill } from 'react-icons/ri';
import { BiCloset } from 'react-icons/bi';

import { BsDoorOpenFill, BsCloudSun } from 'react-icons/bs';
import {
  MdOutlineOutdoorGrill,
  MdMeetingRoom,
  MdOutlineCalendarToday,
} from 'react-icons/md';
import { LiaHotTubSolid } from 'react-icons/lia';
import { PiThermometerHotFill } from 'react-icons/pi';
import { PiDesk } from 'react-icons/pi';
import { CgGym } from 'react-icons/cg';
import { GiElevator } from 'react-icons/gi';
import { TiHeartOutline } from 'react-icons/ti';
import { AiOutlineSetting } from 'react-icons/ai';
import { UserNavigationItem } from '@/types/user-navigation';
import { FcGoogle } from 'react-icons/fc';

export const SERVER_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_PROD_URL
    : process.env.NEXT_PUBLIC_DEV_URL;

export const APP_NAME = 'Bayti';

export const DOMAIN = process.env.DOMAIN;

export const APP_PROVIDERS = ['google', 'dropbox'];

export const navigationData = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Properties',
    href: '/properties',
  },
  {
    title: 'Company',
    items: [
      {
        title: 'About Us',
        href: '/about-us',
      },
      {
        title: 'Talk to an Agent',
        href: '/contact-us',
      },
      {
        title: 'Terms & Conditions',
        href: '/terms-and-conditions',
      },
      {
        title: 'Privacy Policy',
        href: '/privacy-policy',
      },
    ],
  },
  {
    title: 'Agents',
    href: '/agents',
  },
  {
    title: 'Blog',
    href: '/blogs',
  },
];
export const footerNavigationData = [
  {
    title: 'Resources',
    items: [
      {
        title: 'Home',
        href: '/',
      },
      {
        title: 'Properties',
        href: '/properties',
      },
      {
        title: 'Blog',
        href: '/blogs',
      },
      {
        title: 'Agents',
        href: '/agents',
      },
    ],
  },
  {
    title: 'Company',
    items: [
      {
        title: 'About Us',
        href: '/about-us',
      },
      {
        title: 'Talk to an Agent',
        href: '/contact-us',
      },
    ],
  },
  {
    title: 'Legal',
    items: [
      {
        title: 'Terms & Conditions',
        href: '/terms-and-conditions',
      },
      {
        title: 'Privacy Policy',
        href: '/privacy-policy',
      },
    ],
  },
];

export const USER_NAVIGATION: UserNavigationItem[] = [
  {
    label: 'My Account',
    href: '/account',
    icon: LuUser,
  },
  {
    label: 'My Bookings',
    href: '/account/bookings',
    icon: MdOutlineCalendarToday,
  },
  {
    label: 'Favorites',
    href: '/account/favorites',
    icon: TiHeartOutline,
  },
  {
    label: 'Settings',
    href: '/account/settings',
    icon: AiOutlineSetting,
  },
];

export const AGENT_ROLES = [
  {
    name: 'Sales Agent',
    value: 'SALES',
  },
  {
    name: 'Leasing Agent',
    value: 'LEASING',
  },
  {
    name: 'Property Manager',
    value: 'PROPERTY_MANAGER',
  },
  {
    name: 'Listing Agent',
    value: 'LISTING',
  },
  {
    name: 'Buyers Agent',
    value: 'BUYERS_AGENT',
  },
  {
    name: 'Luxury Specialist',
    value: 'LUXURY_SPECIALIST',
  },
  {
    name: 'Commercial Agent',
    value: 'COMMERCIAL',
  },
  {
    name: 'Rental Consultant',
    value: 'RENTAL_CONSULTANT',
  },
  {
    name: 'Consultant',
    value: 'CONSULTANT',
  },
];

export const HOME_STATISTICS = [
  { value: '350+', label: 'Premium Properties' },
  { value: '1200+', label: 'Happy Clients' },
  { value: '5+', label: 'UAE Cities Covered' },
];

export const ABOUT_STATISTICS = [
  {
    value: '250+',
    label: 'Luxury Apartments',
    description:
      'A curated portfolio of premium apartments in prime locations, offering modern design, comfort, and long-term value.',
  },
  {
    value: '15+',
    label: 'Years of Experience',
    description:
      'Over a decade of industry expertise, providing deep market knowledge and reliable guidance at every step.',
  },
  {
    value: '50+',
    label: 'Properties Sold',
    description:
      'Successfully delivered high-end properties to clients, ensuring quality, trust, and a seamless buying experience.',
  },
  {
    value: '400M+',
    label: 'Project Value',
    description:
      'A portfolio of high-value properties managed with precision, discretion, and long-term investment focus.',
  },
];

export const OUR_PURPOSE = [
  {
    title: 'Your Goals, Our Priority',
    description:
      'We listen to your needs and tailor our services to help you find the perfect property that aligns with your lifestyle and investment goals.',
    icon: LuUsers,
  },
  {
    title: 'Reliable Guidance, Every Step',
    description:
      'With deep market knowledge and years of experience, we provide honest advice and strategic insights for confident decisions.',
    icon: FaRegFileAlt,
  },
  {
    title: 'Building for Today & Tomorrow',
    description:
      'We focus on sustainable development and innovative solutions to create lasting value for our clients.',
    icon: PiChartLineUp,
  },
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
    icon: MdMeetingRoom,
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

export const CITIES = [
  { name: 'Dubai', value: 'dubai' },
  { name: 'Abu Dhabi', value: 'abu dhabi' },
  { name: 'Sharjah', value: 'sharjah' },
  { name: 'Ajman', value: 'ajman' },
  { name: 'Ras Al Khaimah', value: 'ras al khaimah' },
  { name: 'Fujairah', value: 'fujairah' },
  { name: 'Umm Al Quwain', value: 'umm al quwain' },
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
    question: 'What types of properties are available on Bayti?',
    answer:
      'Bayti offers apartments, villas, townhouses, penthouses, duplexes, studios, traditional homes, and luxury properties across the UAE. We have options to suit every preference and lifestyle.',
  },
  {
    question: 'What kind of customer support does Bayti offer?',
    answer:
      'Bayti provides 24/7 support. Our team can help with property questions, scheduling visits, and assistance during buying or renting.',
  },
  {
    question: 'How can I book a property visit?',
    answer:
      'Log in, select the property, and click "Book a Visit." Choose a convenient date and time, and an agent will confirm your appointment.',
  },
  {
    question: 'What happens after I reserve a visit?',
    answer:
      'Our agent confirms your booking with date, time, and property details. On the scheduled day, you can visit the property in person with the agent.',
  },
  {
    question: 'How long do I have to confirm a booked visit?',
    answer:
      'After booking, the agent will confirm your visit within 24 hours. Once confirmed, your appointment is secured, and you can visit the property at the scheduled time.',
  },
];

export const RESERVING_TIMES = [
  { title: '9:00 AM - 11:00 AM', value: '09:00:00-11:00:00' },
  { title: '11:00 AM - 1:00 PM', value: '11:00:00-13:00:00' },
  { title: '1:00 PM - 3:00 PM', value: '13:00:00-15:00:00' },
  { title: '3:00 PM - 5:00 PM', value: '15:00:00-17:00:00' },
];

export const SOCIAL_MEDIA_PLATFORMS = [
  {
    name: 'Facebook',
    platform: 'facebook',
  },
  {
    name: 'Instagram',
    platform: 'instagram',
  },
  {
    name: 'LinkedIn',
    platform: 'linkedin',
  },
  {
    name: 'Threads',
    platform: 'threads',
  },
];

export const BOOKING_STATUSES = [
  { name: 'Pending', value: 'PENDING', color: 'yellow' },
  { name: 'Confirmed', value: 'CONFIRMED', color: 'fuchsia' },
  { name: 'Cancelled', value: 'CANCELLED', color: 'blue' },
  { name: 'Completed', value: 'COMPLETED', color: 'green' },
  { name: 'Rejected', value: 'REJECTED', color: 'red' },
];

export const ACCOUNT_DELETION_WARNINGS = [
  {
    id: 1,
    description:
      'All your bookings, favorites will be permanently deleted from our system.',
  },
  {
    id: 2,
    description: 'Your account will be permanently deleted.',
  },
  {
    id: 3,
    description: 'All your personal information will be removed.',
  },
  {
    id: 4,
    description: 'Your saved data and settings will be lost.',
  },
];

export const OUR_TEAM = [
  {
    name: 'Daniel Carter',
    role: 'Founder & CEO',
    image: '/images/team/daniel-carter.jpg',
  },
  {
    name: 'Michael Turner',
    role: 'Head of Operations',
    image: '/images/team/michael-turner.jpg',
  },
  {
    name: 'James Walker',
    role: 'Lead Property Consultant',
    image: '/images/team/james-walker.jpg',
  },
  {
    name: 'Ethan Brooks',
    role: 'Chief Technology Officer',
    image: '/images/team/ethan-brooks.jpg',
  },
  {
    name: 'Lucas Bennett',
    role: 'Head of Product',
    image: '/images/team/lucas-bennett.jpg',
  },
  {
    name: 'Oliver Scott',
    role: 'Lead Designer',
    image: '/images/team/oliver-scott.jpg',
  },
];

export const SOCIAL_PROVIDERS = [
  {
    id: 'google',
    label: 'Continue with Google',
    icon: FcGoogle,
  },
  {
    id: 'dropbox',
    label: 'Continue with Dropbox',
    icon: FaDropbox,
  },
];

export const QUICK_AI_SUGGESTIONS = [
  `What is ${APP_NAME}?`,
  `What services does ${APP_NAME} offer?`,
  `How to book a visit with ${APP_NAME}?`,
  `How can I contact ${APP_NAME}'s support team?`,
];
