import '@shieldpay/wheeljack/testing/jest-setup';

const ENV = process.env;

process.env = {
  ...ENV,
  ADMIN_USER_POOL_ID: 'eu-fake-1_E7HbWx2t6', // Format here is validated by cognito and will throw shade if incorrect.
  ADMIN_USER_POOL_CLIENT_ID: 'fake',
  AWS_REGION: 'eu-fake-1',
};
