var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { logs } from 'named-logs';
const console = logs('web3w-walletconnect-v2:index');
class WalletConnectModule {
    constructor(config) {
        this.id = 'walletconnect-v2';
        this.config = config;
    }
    setup(config) {
        return __awaiter(this, void 0, void 0, function* () {
            config = Object.assign(Object.assign({}, this.config), config);
            const EthereumProvider = yield import('@walletconnect/ethereum-provider');
            this.walletConnectProvider = new EthereumProvider.default(config);
            try {
                yield this.walletConnectProvider.enable();
            }
            catch (e) {
                yield this.walletConnectProvider.request({ method: 'eth_requestAccounts', params: [] });
            }
            // TODO remove
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            window.walletConnectProvider = this.walletConnectProvider;
            return {
                web3Provider: this.walletConnectProvider,
                chainId: config.chainId.toString(),
            };
        });
    }
    logout() {
        // return this.walletConnectProvider.close();
        return Promise.resolve();
    }
    disconnect() {
        var _a;
        (_a = this.walletConnectProvider) === null || _a === void 0 ? void 0 : _a.disconnect(); // TODO here (instead of logout) ?
        this.walletConnectProvider = undefined;
        // TODO remove
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.walletConnectProvider = undefined;
    }
    isLoggedIn() {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
}
export class WalletConnectModuleLoader {
    constructor(config) {
        this.id = 'walletconnect';
        this.moduleConfig = config;
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            return new WalletConnectModule(this.moduleConfig);
        });
    }
}
//# sourceMappingURL=index.js.map