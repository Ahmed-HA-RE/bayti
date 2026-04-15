# 🏘️ Bayti – UAE Real Estate Platform 🇦🇪

Bayti is a full-stack real estate platform designed for managing properties, clients, bookings, and content in one centralized system. It provides a modern interface for administrators to handle business operations efficiently, while enabling users to explore properties, view details, and make bookings seamlessly.

Bayti is a real estate agency that provides a comprehensive platform for managing properties, clients, blogs and bookings. It offers a user-friendly interface for the admins to handle all aspects of the real estate business, such as property listings, client, booking, agent, and blog managements. While clients can easily browse through the available properties, view details, and make bookings. The system also includes a blog section where agency can share articles and updates about the real estate market in the UAE.

## Live Demo 🚀

[Press here to view the live demo](https://bayti.ahmedrehandev.net/)

## ✨ Features

- **Property Management** – Full CRUD operations for listings, including pricing, location, and features
- **Location Integration** – Fetch and display property locations using third-party APIs
- **User Accounts** – Profile management, booking tracking, and account settings
- **Admin Dashboard** (ERP) – Manage properties, clients, bookings, agents, and blogs from a centralized system
- **Blog System** – Create, edit, and publish articles using a rich text editor
- **Booking System** – Schedule property bookings with date and time selection
- **Authentication & Authorization** – Secure access control for users and admins
- **Two-Factor Authentication** - Enhance account security with 2FA options
- **Responsive Design** – Optimized for desktop, tablet, and mobile devices

## Tech Stack 🧰

- **Frontend**: Next.js, React, Tailwind CSS, Shadcn UI, Framer Motion, React Hook Form, Zod and Tanstack Query.
- **Backend**: Node.js
- **Database**: PostgreSQL with Neon Cloud Service and Prisma ORM
- **Authentication**: BetterAuth
- **Deployment**: Vercel
- **AI**: Google Gemini
- **Email Service**: Resend & React Email
- **Maps and Location Services**: LocationIQ API
- **Storage**: Uploadthing

## App Preview 📸

![App Preview Image](/public/images/app-preview.jpg)

## Installation

1. Clone the repository

```
git clone https://github.com/Ahmed-HA-RE/bayti.git
```

2. Install dependencies

```
npm install
```

3. Add .env file in the root directory and add the following environment variables:

```
NEXT_PUBLIC_BETTER_AUTH_DASHBOARD=
BETTER_AUTH_API_KEY=
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_LOCATIONIQ_API_TOKEN=
UPLOADTHING_TOKEN=
GOOGLE_RECAPTCHA=
NEXT_PUBLIC_GOOGLE_RECAPTCHA_CLIENT=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_PROD_URL=
NEXT_PUBLIC_DEV_URL=http://localhost:3000
NEXT_PUBLIC_DEV_EMAIL_URL=http://localhost:3001
DOMAIN=
RESEND_API_KEY=
DATABASE_URL=
BETTER_AUTH_SECRET=
DROPBOX_CLIENT_ID=
DROPBOX_CLIENT_SECRET=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```
