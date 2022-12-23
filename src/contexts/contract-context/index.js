import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ADDRESSES } from "./address";
import token from "./abis/Token.json";
import voting from "./abis/Voting.json";
import { useWeb3Context } from "../web3-context";
import { BigNumber, ethers } from "ethers";
const ContractContext = createContext({});

export function ContractProvider({
    children }) {
    const {
        web3Provider,
        rpcProvider,
        chain
    } = useWeb3Context();

    const tokenCallContract = useMemo(() => {
        return new ethers.Contract(ADDRESSES[chain.chainId].token, token.abi, rpcProvider);
    }, [chain, rpcProvider]);

    const votingCallContract = useMemo(() => {
        return new ethers.Contract(ADDRESSES[chain.chainId].contract, voting.abi, rpcProvider);
    }, [chain, rpcProvider]);

    const contextData = useMemo(() => {
        return {
            tokenCallContract,
            votingCallContract
        }
    }, [web3Provider,
        rpcProvider,
        chain]);
    return (
        <ContractContext.Provider value={contextData}>
            {children}
        </ContractContext.Provider>
    );
}
export const useContractContext = () => useContext(ContractContext);

