import App from "./App";
import { Web3Provider } from "./contexts/web3-context";
import { CHAIN_IDS } from "./contexts/web3-context/chains";
import { SnackbarProvider } from 'notistack';
let allowedChainIds = [CHAIN_IDS.BSC_TESTNET, CHAIN_IDS.GTH_TESTNET];
const Root = () => {
    return (
        <Web3Provider
            allowedChainIds={allowedChainIds}
            defaultChainId={allowedChainIds[1]}
            autoSwitchNetwork={true}
        >
            <SnackbarProvider maxSnack={3}>
                <App />
            </SnackbarProvider>
        </Web3Provider>
    );
};
export default Root;