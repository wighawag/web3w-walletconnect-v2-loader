import type { Web3WModule, Web3WModuleLoader } from 'web3w';
import type { EthereumProviderOptions } from '@walletconnect/ethereum-provider';
export declare class WalletConnectModuleLoader implements Web3WModuleLoader {
    readonly id: string;
    private moduleConfig;
    constructor(config: EthereumProviderOptions);
    load(): Promise<Web3WModule>;
}
//# sourceMappingURL=index.d.ts.map