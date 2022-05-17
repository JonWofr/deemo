import { ConnectResult } from '@wagmi/core';

// Missing export from wagmi. Therefore it's redeclared here.
interface Connection {
  readonly activeConnector:
    | import('@wagmi/core').Connector<any, any>
    | undefined;
  readonly connect: (
    connector_?: import('@wagmi/core').Connector<any, any> | undefined
  ) => void;
  readonly connectAsync: (
    connector_?: import('@wagmi/core').Connector<any, any> | undefined
  ) => Promise<ConnectResult<import('@ethersproject/providers').BaseProvider>>;
  readonly connectors: import('@wagmi/core').Connector<any, any>[];
  readonly data:
    | ConnectResult<import('@ethersproject/providers').BaseProvider>
    | undefined;
  readonly error: Error | null;
  readonly isConnected: boolean;
  readonly isConnecting: boolean;
  readonly isDisconnected: boolean;
  readonly isError: boolean;
  readonly isIdle: boolean;
  readonly isReconnecting: boolean;
  readonly pendingConnector:
    | import('@wagmi/core').Connector<any, any>
    | undefined;
  readonly reset: () => void;
  readonly status:
    | 'error'
    | 'connecting'
    | 'connected'
    | 'reconnecting'
    | 'disconnected'
    | 'idle';
}

export default Connection;
