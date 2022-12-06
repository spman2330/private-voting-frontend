import { ethers } from "ethers"

import token from "../contracts/Token.json"
import vote from "../contracts/Voting.json"
const VOTE_ADDRESS = '0x59ed3b3073443656CD0854857865f77C51BFa9AB';
const TOKEN_ADDRESS = '0x4c4274e95baff67F0687EFd1D93f3e56e12b399D';
const BigInt = window.BigInt;

export async function connectMetamask() {
    const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
    });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const walletAddress = accounts[0];
    const signer = provider.getSigner(walletAddress);
    console.log("signer = ", signer);
    console.log("signer address = ", await signer.getAddress());
    const tokenContract = new ethers.Contract(TOKEN_ADDRESS, token.abi, signer);
    const votingContract = new ethers.Contract(VOTE_ADDRESS, vote.abi, signer);
    var count = await votingContract.pollCount();
    count = Number(count);
    console.log(" polls count = ", count);
    var data = [];
    for (let i = 1; i <= count; i++) {
        var datai = await votingContract.polls(i);
        console.log(" data at ", i, " = ", datai);
        const dataii = {};
        dataii.id = Number(datai.id);
        dataii.title = datai.content;
        dataii.status = await votingContract.state(dataii.id);
        dataii.start = datai.startTimeStamp;
        dataii.end = dataii.start + datai.duration;
        dataii.numberVoteYes = Number(datai.numberVoteYes);
        dataii.numberVoteNo = Number(datai.numberVoteNo);
        dataii.publicKey = await votingContract.getPublicKey(dataii.id);
        data.push(dataii);
    }
    console.log("data convert = ", data);
}