import { ethers } from "ethers";
import { connectMetamask } from "./connectWallet";

import token from "../contracts/Token.json"
import vote from "../contracts/Voting.json"
const VOTE_ADDRESS = '0x59ed3b3073443656CD0854857865f77C51BFa9AB';
const TOKEN_ADDRESS = '0x4c4274e95baff67F0687EFd1D93f3e56e12b399D';

export async function getCountPolls() {

    var signer = connectMetamask();
    console.log(" signer address = ", await signer.getAddress());
    const tokenContract = new ethers.Contract(TOKEN_ADDRESS, token.abi, signer);
    const votingContract = new ethers.Contract(VOTE_ADDRESS, vote.abi, signer);
    var count = await votingContract.pollCount;
    console.log(" polls count = ", count);
    console.log(123);
}