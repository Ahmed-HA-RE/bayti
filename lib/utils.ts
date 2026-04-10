import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Status } from './generated/prisma';
import { UAParser } from 'ua-parser-js';
import { Session } from 'better-auth';
import { format } from 'date-fns';
import { AGENT_ROLES } from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalizeFirstLetter = (text: string) => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const formatPrice = (price: number) => {
  return price.toLocaleString('en-AE', {
    notation: 'compact',
    maximumFractionDigits: 1,
  });
};

export const convertToPlainObject = <T>(data: T): T => {
  return JSON.parse(JSON.stringify(data));
};

export const formatCityName = (city: string) => {
  return city
    .replace(/_/g, ' ')
    .split(' ')
    .map((word) => capitalizeFirstLetter(word))
    .join(' ');
};

export const formatUploadThingError = (
  error: string,
  type: 'single' | 'multiple',
) => {
  if (error.includes('FileSizeMismatch')) {
    return type === 'single'
      ? 'File size mismatch. Please try again.'
      : 'One or more files have a size mismatch. Please try again.';
  } else if (error.includes('FileCountMismatch')) {
    return type === 'single'
      ? 'File count mismatch. Please try again.'
      : 'One or more files have a count mismatch. Please try again.';
  } else {
    return 'An unknown error occurred. Please try again.';
  }
};

export const bookingStatusColors = (status: Status) => {
  switch (status) {
    case 'PENDING':
      return 'bg-yellow-500';
    case 'CONFIRMED':
      return 'bg-fuchsia-500';
    case 'CANCELLED':
      return 'bg-blue-500';
    case 'COMPLETED':
      return 'bg-green-500';
    case 'REJECTED':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

export const formatUAParser = (session: Session) => {
  const userAgent = session.userAgent;
  if (!userAgent) {
    return {
      browser: 'Unknown Browser',
      os: 'Unknown OS',
      device: 'Unknown Device',
      createdAt: format(session.createdAt, 'MMM d, yyyy, h:mm a'),
      expiresAt: format(session.expiresAt, 'MMM d, yyyy, h:mm a'),
    };
  } else {
    const { browser, os, device } = UAParser(userAgent);
    const browserName = browser.name || 'Unknown Browser';
    const osName = os.name || 'Unknown OS';
    const deviceType =
      device.type === 'mobile'
        ? 'mobile'
        : device.type === 'tablet'
          ? 'tablet'
          : 'desktop';
    const createdAt = format(session.createdAt, 'MMM d, yyyy, h:mm a');
    const expiresAt = format(session.expiresAt, 'MMM d, yyyy, h:mm a');
    return {
      browser: browserName,
      os: osName,
      device: deviceType,
      createdAt,
      expiresAt,
    };
  }
};

export const formatAgentRole = (role: string) => {
  return AGENT_ROLES.find((r) => r.value === role)?.name;
};
