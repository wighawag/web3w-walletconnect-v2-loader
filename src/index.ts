import type {Web3WModule, WindowWeb3Provider, Web3WModuleLoader} from 'web3w';
import type IEthereumProvider from '@walletconnect/ethereum-provider';
import type {EthereumProviderOptions} from '@walletconnect/ethereum-provider';

import {logs} from 'named-logs';
const console = logs('web3w-walletconnect-v2:index');

class WalletConnectModule implements Web3WModule {
  public readonly id = 'walletconnect-v2';

  private config: EthereumProviderOptions;
  private walletConnectProvider: IEthereumProvider | undefined; // TODO ?

  constructor(config: EthereumProviderOptions) {
    this.config = config;
  }

  async setup(config?: EthereumProviderOptions): Promise<{chainId: string; web3Provider: WindowWeb3Provider}> {
    config = {...this.config, ...config};

    const EthereumProvider = await import('@walletconnect/ethereum-provider');

    this.walletConnectProvider = new EthereumProvider.default(config);

    // try {
    //   await this.walletConnectProvider.enable();
    // } catch (e) {
    await this.walletConnectProvider.request({method: 'eth_requestAccounts', params: []});
    // }

    // TODO remove
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).walletConnectProvider = this.walletConnectProvider;

    return {
      web3Provider: this.walletConnectProvider,
      chainId: config.chainId.toString(),
    };
  }

  logout(): Promise<void> {
    // return this.walletConnectProvider.close();
    return Promise.resolve();
  }

  disconnect(): void {
    this.walletConnectProvider?.disconnect(); // TODO here (instead of logout) ?
    this.walletConnectProvider = undefined;

    // TODO remove
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).walletConnectProvider = undefined;
  }

  async isLoggedIn(): Promise<boolean> {
    return true;
  }
}

export class WalletConnectV2ModuleLoader implements Web3WModuleLoader {
  public readonly id: string = 'walletconnect-v2';

  private moduleConfig: EthereumProviderOptions;

  constructor(config: EthereumProviderOptions) {
    this.moduleConfig = config;
  }

  async load(): Promise<Web3WModule> {
    return new WalletConnectModule(this.moduleConfig);
  }
}
