export type Navigation = {
  title: string;
  href?: string;
  items?: {
    title: string;
    href: string;
  }[];
  image?: {
    img: string;
    href: string;
  };
};
