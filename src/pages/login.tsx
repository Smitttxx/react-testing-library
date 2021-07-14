import React from 'react';

import { Login } from '@shieldpay/authentication-ui';
import { Box } from '@shieldpay/bumblebee';

export const LoginPage = () => (
  <Box
    css={{ width: '100%', height: '100%' }}
    alignItems={['center', 'center']}
    component="main"
    role="main"
  >
    <Login />
  </Box>
);
