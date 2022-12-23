import { CHAIN_IDS } from "../web3-context/chains"

const BSC = {
    token: "0xECB91C95f10beF9549e554151b32ef5A5bfDe320",
}
const GTH = {
    token: "0xECB91C95f10beF9549e554151b32ef5A5bfDe320",
}

const ADDRESSES = {
    [CHAIN_IDS.BSC_TESTNET]: BSC,
    [CHAIN_IDS.GTH_TESTNET]: GTH
}

export { ADDRESSES }