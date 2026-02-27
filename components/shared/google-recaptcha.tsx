'use client';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import React from 'react';

const GoogleRecaptcha = ({ children }: { children: React.ReactNode }) => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_CLIENT as string}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
};

export default GoogleRecaptcha;
