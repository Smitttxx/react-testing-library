import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { Box, Breadcrumb, Heading, Text } from '@shieldpay/bumblebee';

import { CreatePartnerForm } from '../components/create-partner/create-partner-form';

export const CreatePartnerPage = () => {
  const { formatMessage } = useIntl();
  const breadcrumbItems = [
    {
      path: '/partners',
      label: formatMessage({ id: 'paycast.createPartner.breadcrumb.partners' }),
    },
    {
      label: formatMessage({
        id: 'paycast.createPartner.title',
      }),
    },
  ];

  return (
    <Box spacing="basePos5">
      <Breadcrumb items={breadcrumbItems} />
      <Heading visualLevel="2">
        <FormattedMessage id="paycast.createPartner.title" />
      </Heading>
      <Text>
        <FormattedMessage id="paycast.createPartner.description" />
      </Text>
      <CreatePartnerForm
        // TODO: Remove when implemented
        onSubmit={
          /* istanbul ignore next */ () => {
            /** */
          }
        }
      />
    </Box>
  );
};
