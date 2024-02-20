import { createPromiseClient } from '@connectrpc/connect';
import { createGrpcWebTransport } from '@connectrpc/connect-web';
import { StationAPI } from '../gen/proto/stationapi_connect';

const transport = createGrpcWebTransport({
  baseUrl: import.meta.env.VITE_API_URL,
});

export const grpcClient = createPromiseClient(StationAPI, transport);
