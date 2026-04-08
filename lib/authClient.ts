import { createAuthClient } from 'better-auth/react';
import {
  customSessionClient,
  adminClient,
  lastLoginMethodClient,
} from 'better-auth/client/plugins';

import { auth } from './auth';
export const authClient = createAuthClient({
  plugins: [
    customSessionClient<typeof auth>(),
    adminClient(),
    lastLoginMethodClient({
      cookieName: 'lastLoginMethod',
    }),
  ],
});
