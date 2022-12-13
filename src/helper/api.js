import { BigNumber, ethers } from "ethers";

import token from "../contracts/Token.json"
import vote from "../contracts/Voting.json"
import Web3 from 'web3'
const VOTE_ADDRESS = '0xe32ED7aEE08BcAaaf4Ff1426dd472557b47e350e';
const TOKEN_ADDRESS = '0xECB91C95f10beF9549e554151b32ef5A5bfDe320';
const snarkjs = window.snarkjs;
const BigInt = window.BigInt;
const status = ["Pending",
    "Active",
    "Done",
    "Canceled",
    "Succeeded"]
export async function fetchMetric(pollId) {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
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
            factor: 1
        },
        {
            name: 'Credit Score',
            amount: 500,
            factor: 0
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

export function reduce(address) {
    var reduceAddress = address.slice(0, 6) + "..." + address.slice(-4);
    return reduceAddress;
}
export function convertTime(time) {
    const date = new Date(parseInt(time) * 1000);
    const [month, day, year, hour, minutes, seconds] = [
        date.getMonth(),
        date.getDate(),
        date.getFullYear(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
    ];
    const formattedTime = day + '/' + month + '/' + year + " " + hour + ':' + minutes + ':' + seconds;
    return formattedTime;
}
export async function connectMetamask() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return await signer.getAddress();
}
export async function getListPoll() {
    const url = 'https://data-seed-prebsc-1-s1.binance.org:8545/';
    const provider = new Web3.providers.HttpProvider(url)
    const web3 = new Web3(provider);
    const votingContract = new web3.eth.Contract(vote.abi, VOTE_ADDRESS);
    var count = await votingContract.methods.pollCount().call();
    count = Number(count);
    var data = [];
    for (let i = count; i > 0; i--) {
        var datai = await votingContract.methods.polls(i).call();
        const dataii = {};
        dataii.id = Number(datai.id);
        [dataii.title, dataii.text] = datai.content.split('|');
        dataii.status = status[await votingContract.methods.state(dataii.id).call()];
        dataii.start = datai.startTimeStamp;
        dataii.end = +dataii.start + +datai.duration;
        dataii.for = Number(datai.numberVoteYes);
        dataii.against = Number(datai.numberVoteNo);
        dataii.pubKey = await votingContract.methods.getPublicKey(dataii.id).call();
        dataii.metrics = [
            {
                name: "Snapshot token",
                factor: 1,
                isZiden: false
            },
            {
                name: "Credit score",
                factor: 0,
                isZiden: true
            },
            {
                name: "Trava Reputation",
                factor: 1,
                isZiden: true
            }
        ]
        data.push(dataii);
    }
    return data;
}   