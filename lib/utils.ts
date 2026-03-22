import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
