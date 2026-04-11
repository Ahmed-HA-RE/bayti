/* eslint-disable @typescript-eslint/no-namespace */

export {};

declare global {
  namespace PrismaJson {
    type SocialMediaLinks = {
      url: string;
      platform: string;
    };
  }
}
