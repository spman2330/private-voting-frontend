import { CHAIN_IDS } from "../web3-context/chains"

const BSC = {
    token: "0xB1DFEcE55eb3D6898CcDB6308a6516838ff8910B",
    voting: "0x399530e173E569AE8De5258bf391d58a3e7AE31a",
}
const GTH = {
    token: "0xECB91C95f10beF9549e554151b32ef5A5bfDe320",
    voting: "0x600BA38bc9185746685501C0d40081101E16396d",
}

const ADDRESSES = {
    [CHAIN_IDS.BSC_TESTNET]: BSC,
    [CHAIN_IDS.GTH_TESTNET]: GTH
}

export { ADDRESSES }