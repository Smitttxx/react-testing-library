import { useAuthenticatedUser } from '@shieldpay/authentication-ui';

import { BASE_URL } from './config';

type UseFetchInit = Omit<RequestInit, 'body'>;

export const useFetch = <T>(url: string, options?: UseFetchInit) => {
  const {
    user: { idToken },
  } = useAuthenticatedUser();

  return (data?: T) => {
    const requestOptions: RequestInit = options || {};

    requestOptions.headers = {
      Authorization: idToken!,
      ...requestOptions.headers,
    };

    if (options && options.method !== 'GET') {
      requestOptions.body = JSON.stringify(data);
      requestOptions.headers = {
        'content-type': 'application/json',
        ...requestOptions.headers,
      };
    }

    return fetch(BASE_URL + url, requestOptions).then((res) => res.json());
  };
};
