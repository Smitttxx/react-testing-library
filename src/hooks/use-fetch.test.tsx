import React, { useEffect, useState } from 'react';

import {
  renderWithAuthenticatedUser,
  rest,
  setupMockServer,
  waitFor,
} from '@shieldpay/wheeljack/testing';

import { BASE_URL } from './config';
import { useFetch } from './use-fetch';

const dummyUrl = '/foo';
const DUMMY_TOKEN = 'DUMMY_TOKEN';

jest.mock('@shieldpay/authentication-ui', () => ({
  __esModule: true,
  ...jest.requireActual('@shieldpay/authentication-ui'),
  useAuthenticatedUser: () => {
    return {
      user: { idToken: DUMMY_TOKEN },
      signIn: jest.fn(),
      signOut: jest.fn(),
    };
  },
}));

const UseFetchExample = () => {
  const [text, updateText] = useState('');
  const myGet = useFetch(dummyUrl);
  const myPost = useFetch(dummyUrl, { method: 'POST' });

  useEffect(() => {
    const execute = async () => {
      const res = await myGet();

      myPost({ someStuff: 'ok' });

      updateText(res.data);
    };

    execute();
  }, []);

  return <div>{text}</div>;
};

beforeEach(() => jest.resetAllMocks());

const mockPostAction = jest.fn();
const mockHeaderCheck = jest.fn();

describe('useFetch', () => {
  setupMockServer([
    rest.get(BASE_URL + dummyUrl, (req, res, ctx) => {
      mockHeaderCheck(req.headers.get('authorization'));

      return res(
        ctx.json({
          data: 'yes',
        }),
      );
    }),
    rest.post(BASE_URL + dummyUrl, (req, res, ctx) => {
      mockHeaderCheck(req.headers.all());
      mockPostAction(req.body);

      return res(
        ctx.json({
          data: 'yes',
        }),
      );
    }),
  ]);

  it('makes a GET request with correct headers', async () => {
    const { findByText } = renderWithAuthenticatedUser(<UseFetchExample />);

    expect(await findByText('yes')).toBeInTheDocument();
    expect(mockHeaderCheck).toBeCalledWith(
      expect.objectContaining({
        authorization: 'DUMMY_TOKEN',
      }),
    );
  });

  it('makes a POST request with correct headers', async () => {
    renderWithAuthenticatedUser(<UseFetchExample />);

    await waitFor(() =>
      expect(mockPostAction).toBeCalledWith({ someStuff: 'ok' }),
    );
    expect(mockHeaderCheck).toBeCalledWith(
      expect.objectContaining({
        authorization: 'DUMMY_TOKEN',
        'content-type': 'application/json',
      }),
    );
  });
});
