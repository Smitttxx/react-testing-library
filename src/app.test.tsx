import React, { ReactElement } from 'react';

import * as authenticationUi from '@shieldpay/authentication-ui';
import {
  renderWithAllProviders,
  userEvent,
  waitFor,
} from '@shieldpay/wheeljack/testing';

import { App } from './app';

const { AuthenticatedUserProvider, useAuthenticatedUser } = authenticationUi;

jest.mock('@shieldpay/authentication-ui', () => ({
  ...(jest.requireActual('@shieldpay/authentication-ui') as {
    Login: ReactElement;
    AuthenticatedUserProvider: ReactElement;
  }),
  useAuthenticatedUser: jest.fn(),
}));

// TODO: This is currently needed because the login module imports
// `useAuthenticatedUser` from a relative path inside the Login component.
// This means the Jest mock implementation above doesn't apply to
// `useAuthenticatedUser` when called inside `@shieldpay/authentication-ui`.
const WrappedApp = () => (
  <AuthenticatedUserProvider>
    <App />
  </AuthenticatedUserProvider>
);

const email = 'kenny.schlogpants@shieldpay.com';

describe('<App />', () => {
  it('renders (Kenny) Log(g)in(s) route if not logged in', async () => {
    (useAuthenticatedUser as jest.Mock).mockImplementation(() => ({
      user: {
        signedIn: false,
        ready: true,
      },
    }));

    const { findByText, queryByText } = await renderWithAllProviders(
      <WrappedApp />,
      {
        route: '/',
      },
    );

    expect(await findByText('Log in to your account')).toBeInTheDocument();
    expect(queryByText(`Logged in as ${email}`)).not.toBeInTheDocument();
    expect(window.location.href).toBe('http://localhost/');
  });

  it('redirects to dummy Dashboard route if logged in', async () => {
    (useAuthenticatedUser as jest.Mock).mockImplementation(() => ({
      user: {
        email,
        signedIn: true,
        ready: true,
      },
    }));

    const {
      findByText,
      findByRole,
      queryByText,
    } = await renderWithAllProviders(<WrappedApp />, {
      route: '/',
    });

    expect(await findByText(`Logged in as ${email}`)).toBeInTheDocument();
    expect(window.location.href).toBe('http://localhost/dashboard');
    expect(queryByText('Log in to your account')).not.toBeInTheDocument();

    expect(await findByRole('link', { name: 'Dashboard' })).toBeInTheDocument();
    expect(await findByRole('link', { name: 'Balances' })).toBeInTheDocument();
    expect(await findByRole('link', { name: 'Partners' })).toBeInTheDocument();

    expect(
      await findByRole('heading', { name: 'Dashboard' }),
    ).toBeInTheDocument();
  });

  it('renders dummy Dashboard route if logged in', async () => {
    (useAuthenticatedUser as jest.Mock).mockImplementation(() => ({
      user: {
        email,
        signedIn: true,
        ready: true,
      },
    }));

    const { findByText } = renderWithAllProviders(<WrappedApp />, {
      route: '/dashboard',
    });

    expect(await findByText(`Logged in as ${email}`)).toBeInTheDocument();
    expect(window.location.href).toBe('http://localhost/dashboard');
  });

  it('renders dummy Balances route if logged in', async () => {
    (useAuthenticatedUser as jest.Mock).mockImplementation(() => ({
      user: {
        email,
        signedIn: true,
        ready: true,
        groups: ['super_user'],
      },
    }));

    const { findByRole, findByText } = await renderWithAllProviders(
      <WrappedApp />,
      {
        route: '/balances',
      },
    );

    userEvent.click(await findByRole('button', { name: email }));

    expect(await findByText(`super_user`)).toBeInTheDocument();
    expect(window.location.href).toBe('http://localhost/balances');

    expect(
      await findByRole('heading', { name: 'Balances' }),
    ).toBeInTheDocument();
  });

  it('renders dummy Partners route if logged in', async () => {
    (useAuthenticatedUser as jest.Mock).mockImplementation(() => ({
      user: {
        email,
        signedIn: true,
        ready: true,
        groups: ['super_user'],
      },
    }));

    const { findByRole, findByText } = await renderWithAllProviders(
      <WrappedApp />,
      {
        route: '/partners',
      },
    );

    userEvent.click(await findByRole('button', { name: email }));

    expect(await findByText(`super_user`)).toBeInTheDocument();
    expect(window.location.href).toBe('http://localhost/partners');

    expect(
      await findByRole('heading', { name: 'Partners' }),
    ).toBeInTheDocument();
  });

  it('renders dummy Partners - Create Partner route if logged in', async () => {
    (useAuthenticatedUser as jest.Mock).mockImplementation(() => ({
      user: {
        email,
        signedIn: true,
        ready: true,
        groups: ['super_user'],
      },
    }));

    const { findByRole, findByText } = await renderWithAllProviders(
      <WrappedApp />,
      {
        route: '/partners/create-partner',
      },
    );

    userEvent.click(await findByRole('button', { name: email }));

    expect(await findByText(`super_user`)).toBeInTheDocument();
    expect(window.location.href).toBe(
      'http://localhost/partners/create-partner',
    );
  });

  it('renders topbar if logged in on dashboard page', async () => {
    (useAuthenticatedUser as jest.Mock).mockImplementation(() => ({
      user: {
        email,
        signedIn: true,
        ready: true,
        groups: ['super_user'],
      },
    }));

    const { findByRole, findByText } = await renderWithAllProviders(
      <WrappedApp />,
      {
        route: '/dashboard',
      },
    );

    userEvent.click(await findByRole('button', { name: email }));

    expect(await findByText(`super_user`)).toBeInTheDocument();
  });

  it('passes the login url to the redirect component if not logged in', async () => {
    (useAuthenticatedUser as jest.Mock).mockImplementation(() => ({
      user: {
        email,
        signedIn: false,
        ready: true,
      },
    }));

    await renderWithAllProviders(<WrappedApp />, {
      route: '/balances',
    });

    await waitFor(() => {
      expect(window.location.href).toBe('http://localhost/');
    });
  });
});
