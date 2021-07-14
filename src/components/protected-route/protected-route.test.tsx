import React from 'react';

import { useAuthenticatedUser } from '@shieldpay/authentication-ui';
import { renderWithRouter } from '@shieldpay/wheeljack/testing';

import { ProtectedRoute } from './protected-route';

jest.mock('@shieldpay/authentication-ui', () => ({
  useAuthenticatedUser: jest.fn(),
}));

describe('<PrimaryNav />', () => {
  it('renders signed in component if signed in', async () => {
    (useAuthenticatedUser as jest.Mock).mockImplementation(() => ({
      user: {
        signedIn: true,
        ready: true,
      },
    }));

    const { queryByText } = renderWithRouter(
      <ProtectedRoute
        path="/"
        loggedIn={() => <>logged in</>}
        loggedOut={() => <>logged out</>}
      />,
      {
        route: '/expect-this-url',
      },
    );

    expect(queryByText('logged in')).toBeInTheDocument();
    expect(queryByText('logged out')).not.toBeInTheDocument();

    expect(window.location.href).toBe('http://localhost/expect-this-url');
  });

  it('renders signed out component if signed out!', async () => {
    (useAuthenticatedUser as jest.Mock).mockImplementation(() => ({
      user: {
        signedIn: false,
        ready: true,
      },
    }));

    const { queryByText } = renderWithRouter(
      <ProtectedRoute
        path="/"
        loggedIn={() => <>logged in</>}
        loggedOut={() => <>logged out</>}
      />,
      {
        route: '/expect-this-url',
      },
    );

    expect(queryByText('logged out')).toBeInTheDocument();
    expect(queryByText('logged in')).not.toBeInTheDocument();

    expect(window.location.href).toBe('http://localhost/expect-this-url');
  });

  it('redirects if not sign in and no signed out prop', async () => {
    (useAuthenticatedUser as jest.Mock).mockImplementation(() => ({
      user: {
        signedIn: false,
        ready: true,
      },
    }));

    const { queryByText } = renderWithRouter(
      <ProtectedRoute path="/" loggedIn={() => <>logged in</>} />,
      {
        route: '/will-be-redirected',
      },
    );

    expect(queryByText('logged out')).not.toBeInTheDocument();
    expect(queryByText('logged in')).not.toBeInTheDocument();

    expect(window.location.href).toBe('http://localhost/');
  });
});
