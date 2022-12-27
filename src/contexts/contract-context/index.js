import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ADDRESSES } from "./address";
import token from "./abis/Token.json";
import voting from "./abis/Voting.json";
import register from "./abis/IRegister.json"
import { useWeb3Context } from "../web3-context";
import { BigNumber, ethers } from "ethers";
const ContractContext = createContext({});

export function ContractProvider({
    children }) {
    const {
        web3Provider,
        rpcProvider,
        address,
        chain
    } = useWeb3Context();


    const tokenCallContract = useMemo(() => {
        return new ethers.Contract(ADDRESSES[chain.chainId].token, token.abi, rpcProvider);
    }, [chain, rpcProvider]);

    const votingCallContract = useMemo(() => {
        return new ethers.Contract(ADDRESSES[chain.chainId].voting, voting.abi, rpcProvider);
    }, [chain, rpcProvider]);

    const registerCallContract = useMemo(() => {
        return new ethers.Contract(ADDRESSES[chain.chainId].register, register.abi, rpcProvider);
    }, [chain, rpcProvider]);

    //console.log(registerCallContract,)
    const votingTransContract = useMemo(() => {
        if (web3Provider) {
            return new ethers.Contract(ADDRESSES[chain.chainId].voting, voting.abi, web3Provider.getSigner(address));
        } else {
            return undefined;
        }
    }, [chain, web3Provider, address]);
    console.log(web3Provider, "___")
    console.log(votingTransContract, "...")
    console.log(votingCallContract);
    const contextData = useMemo(() => {
        return {
            tokenCallContract,
            votingCallContract,
            votingTransContract,
            registerCallContract
        }
    }, [web3Provider,
        rpcProvider,
        address,
        chain]);
    return (
        <ContractContext.Provider value={contextData}>
            {children}
        </ContractContext.Provider>
    );
}
export const useContractContext = () => useContext(ContractContext);

