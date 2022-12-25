import App from "./App";
import { Web3Provider } from "./contexts/web3-context";
import { ContractProvider } from "./contexts/contract-context";
import { CHAIN_IDS } from "./contexts/web3-context/chains";
import { SnackbarProvider } from 'notistack';
import { VotingProvider } from "./contexts/voting-context";
import { ZidenProvider } from "./contexts/ziden-context";
import Layout from "./components/layout";
let allowedChainIds = [CHAIN_IDS.BSC_TESTNET, CHAIN_IDS.GTH_TESTNET];
const Root = () => {
  return (
    <Web3Provider
      allowedChainIds={allowedChainIds}
      defaultChainId={allowedChainIds[0]}
      autoSwitchNetwork={true}
    >
      <ContractProvider>
        <VotingProvider>
          <ZidenProvider>
            <SnackbarProvider maxSnack={3}>
              <Layout>
                <App />
              </Layout>

            </SnackbarProvider>
          </ZidenProvider>
        </VotingProvider>

      </ContractProvider>

    </Web3Provider>
  );
};
export default Root;
