const BNB = {
    name: "BNB",
    symbol: "BNB",
    decimals: 18,
};

const GTH = {
    name: "GoerliETH",
    symbol: "GTH",
    decimals: 18,
};

const CHAIN_IDS = {
    BSC_TESTNET: 97,
    GTH_TESTNET: 5,
};
function isExtendedChainInformation(
    chainInformation
) {
    return !!(chainInformation).nativeCurrency;
}

function getAddChainParameters(
    chainId
) {
    const chainInformation = CHAINS[chainId];
    if (isExtendedChainInformation(chainInformation)) {
        return {
            chainId,
            chainName: chainInformation.name,
            nativeCurrency: chainInformation.nativeCurrency,
            rpcUrls: chainInformation.urls,
            blockExplorerUrls: chainInformation.blockExplorerUrls,
        };
    } else {
        return chainId;
    }
}
const CHAINS = {
    [CHAIN_IDS.BSC_TESTNET]: {
        name: "BSC TESTNET",
        blockExplorerUrls: ["https://testnet.bscscan.com"],
        nativeCurrency: BNB,
        urls: [
            "https://data-seed-prebsc-1-s1.binance.org:8545/",
            // 'https://data-seed-prebsc-2-s1.binance.org:8545/',
            "https://data-seed-prebsc-1-s2.binance.org:8545/",
            "https://data-seed-prebsc-2-s2.binance.org:8545/",
            "https://data-seed-prebsc-1-s3.binance.org:8545/",
            "https://data-seed-prebsc-2-s3.binance.org:8545/",
        ],
        isTestnet: true,
    },
    [CHAIN_IDS.GTH_TESTNET]: {
        name: "Goerli TESTNET",
        blockExplorerUrls: ["https://goerli.etherscan.io"],
        nativeCurrency: GTH,
        urls: [
            "https://goerli.infura.io/v3/",
        ],
        isTestnet: true,
    },
};

export { CHAINS, CHAIN_IDS, getAddChainParameters }