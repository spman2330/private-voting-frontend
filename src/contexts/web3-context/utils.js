export const CONNECTOR_TYPES = {
    METAMASK: "metamask",
    WALLET_CONNECT: "walletconnect",
}

export const getStoredConnector = () => {
    return window.localStorage.getItem("connector");
};

export const setStoredConnector = (connectorType) => {
    if (!connectorType) {
        window.localStorage.removeItem("connector");
    } else {
        window.localStorage.setItem("connector", connectorType);
    }
};

export const getStoredChainId = () => {
    const chainId = window.localStorage.getItem("chainId");
    if (chainId !== null && !isNaN(Number(chainId))) {
        return Number(chainId);
    }
    return null;
};

export const setStoredChainId = () => {
    const chainId = window.localStorage.getItem("chainId");
    if (chainId !== null && !isNaN(Number(chainId))) {
        return Number(chainId);
    }
    return null;
};

/**
 * @see https://github.com/NoahZinsmeister/web3-react/blob/main/packages/walletconnect/src/utils.ts
 */

export function getStoredMockAddress() {
    return window.localStorage.getItem("mockAddress") ?? undefined;
}

export function setStoredMockAddress(address) {
    if (address === undefined) {
        window.localStorage.removeItem("mockAddress");
    } else {
        window.localStorage.setItem("mockAddress", address);
    }
}
