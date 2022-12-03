import { BigNumber, ethers } from "ethers";
import token from "../contracts/Token.json"
import vote from "../contracts/Voting.json"
const VOTE_ADDRESS = '0x59ed3b3073443656CD0854857865f77C51BFa9AB';
const TOKEN_ADDRESS = '0x4c4274e95baff67F0687EFd1D93f3e56e12b399D';
const snarkjs = window.snarkjs;
const BigInt = window.BigInt;

export async function fetchMetric(pollId) {
    console.log(pollId);
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log(provider);
    const signer = provider.getSigner();
    const tokenContract = new ethers.Contract(TOKEN_ADDRESS, token.abi, signer);
    const votingContract = new ethers.Contract(VOTE_ADDRESS, vote.abi, signer);
    const timestamp = (await votingContract.polls(pollId)).startTimeStamp;
    let amount = (await tokenContract.getPriorVotes(signer.getAddress(), timestamp));
    amount = await amount.toString();
    return [
        {
            name: 'Snapshot Token',
            amount,
            factor: 2
        },
        {
            name: 'Credit Score',
            amount: 500,
            factor: 2
        },
        {
            name: 'Trava Reputation',
            amount: 0,
            factor: 1
        }
    ]
}
const genCallData = async (proof, publicSignals) => {
    var callData = (
        await snarkjs.groth16.exportSolidityCallData(proof, publicSignals)
    )
        .toString()
        .split(",")
        .map((e) => {
            return e.replaceAll(/([\[\]\s\"])/g, "");
        });
    let a,
        b = [],
        c,
        publicInputs;
    a = callData.slice(0, 2).map((e) => BigInt(e));
    b[0] = callData.slice(2, 4).map((e) => BigInt(e));
    b[1] = callData.slice(4, 6).map((e) => BigInt(e));
    c = callData.slice(6, 8).map((e) => BigInt(e));
    publicInputs = callData.slice(8, callData.length).map((e) => BigInt(e));
    return { a, b, c, publicInputs };
}

export async function votePoll(id, yes, no) {
    id = 4
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const tokenContract = new ethers.Contract(TOKEN_ADDRESS, token.abi, signer);
    const votingContract = new ethers.Contract(VOTE_ADDRESS, vote.abi, signer);

    let pubKey = await votingContract.getPublicKey(id);

    const timestamp = (await votingContract.polls(id)).startTimeStamp;
    let x = (await tokenContract.getPriorVotes(signer.getAddress(), timestamp));
    x = x.toString();

    const rYes = Math.floor(Math.random(100000) * 100000);
    const rNo = Math.floor(Math.random(100000) * 100000);

    const input = {
        Dx: pubKey[0].toString(),
        Dy: pubKey[1].toString(),
        x, yes, no, rYes, rNo
    }

    const PUBLIC_URL = window.location.origin;

    const { proof, publicSignals } = await snarkjs.groth16.fullProve(
        input,
        PUBLIC_URL + "/circuits/vote.wasm",
        PUBLIC_URL + "/circuits/vote.zkey"
    );
    const { a, b, c, publicInputs } = await genCallData(proof, publicSignals);

    const encryptedVoteYes = publicInputs.filter((e, index) => index < 4);
    const encryptedVoteNo = publicInputs.filter((e, index) => 4 <= index && index < 8);


    const transaction = await votingContract.votePoll(a, b, c, id, encryptedVoteYes, encryptedVoteNo, { gasLimit: 1e6, from: await signer.getAddress() });
    await transaction.wait();
}

