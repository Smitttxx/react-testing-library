import React from 'react';
import { FormattedMessage } from 'react-intl';

import { useAuthenticatedUser } from '@shieldpay/authentication-ui';
import { Box, Heading, Text } from '@shieldpay/bumblebee';

export const DashboardPage = () => {
  const {
    user: { email },
  } = useAuthenticatedUser();

  return (
    <Box spacing="basePos5">
      <Heading visualLevel="2">
        <FormattedMessage id="defaults.dashboard" />
      </Heading>
      <Text>Logged in as {email}</Text>
    </Box>
  );
};
