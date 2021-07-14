import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export const WithReactQuery = ({ children }: { children?: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
