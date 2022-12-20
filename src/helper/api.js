import { BigNumber, ethers } from "ethers";

import token from "../contracts/Token.json";
import vote from "../contracts/Voting.json";
import Web3 from "web3";
import { wait } from "@testing-library/user-event/dist/utils";
const VOTE_ADDRESS = "0x600BA38bc9185746685501C0d40081101E16396d";
const TOKEN_ADDRESS = "0x16fB6Bad62C4BCa076f26Cc3101C29c5A85F072F";
const snarkjs = window.snarkjs;
const BigInt = window.BigInt;
const status = ["Pending", "Active", "Done", "Canceled", "Succeeded"];
export async function fetchMetric(pollId) {
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const tokenContract = new ethers.Contract(TOKEN_ADDRESS, token.abi, signer);
  const votingContract = new ethers.Contract(VOTE_ADDRESS, vote.abi, signer);
  const timestamp = (await votingContract.polls(pollId)).startTimeStamp;
  let amount = await tokenContract.getPriorVotes(
    signer.getAddress(),
    timestamp
  );
  amount = await amount.toString();
  return [
    {
      name: "Snapshot Token",
      amount,
      factor: 1,
    },
    {
      name: "Credit Score",
      amount: 500,
      factor: 0,
    },
    {
      name: "Trava Reputation",
      amount: 0,
      factor: 1,
    },
  ];
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
};

export async function votePoll(id, yes, no) {
  if (yes * no != 0) {
    console.log("Error");
    return;
  }
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const tokenContract = new ethers.Contract(TOKEN_ADDRESS, token.abi, signer);
  const votingContract = new ethers.Contract(VOTE_ADDRESS, vote.abi, signer);

  const timestamp = (await votingContract.polls(id)).startTimeStamp;
  let X = await tokenContract.getPriorVotes(signer.getAddress(), timestamp);

  X = X.toString();
  var x = Math.max(yes, no);
  var r = BigInt(Math.floor(Math.random(100000) * 100000));
  var kX = Math.floor(Math.random(100000) * 100000);
  var kR = Math.floor(Math.random(100000) * 100000);
  var D = BigInt((await votingContract.polls(id)).publicKey);
  var g = 7907;
  var h = 7867;
  var sign;
  if (yes > 0) sign = 1;
  else sign = 0;

  const input = {
    xFake: x,
    sign: sign,
    X: X,
    r: r,
    g: g,
    h: h,
    D: D,
    kX: kX,
    kR: kR,
  };

  const PUBLIC_URL = window.location.origin;

  const { proof, publicSignals } = await snarkjs.groth16.fullProve(
    input,
    PUBLIC_URL + "/circuits/vote.wasm",
    PUBLIC_URL + "/circuits/vote.zkey"
  );

  const { a, b, c, publicInputs } = await genCallData(proof, publicSignals);

  await votingContract.votePoll(
    a,
    b,
    c,
    id,
    publicInputs[0],
    publicInputs[1],
    publicInputs[2],
    publicInputs[3],
    publicInputs[4],
    { gasLimit: 1e6 }
  );

  //await transaction.wait();
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
  const formattedTime =
    day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds;
  return formattedTime;
}
export async function connectMetamask() {
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return await signer.getAddress();
}
export async function getListPoll() {
  const url = "https://data-seed-prebsc-1-s1.binance.org:8545/";
  const provider = new Web3.providers.HttpProvider(url);
  const web3 = new Web3(provider);
  const votingContract = new web3.eth.Contract(vote.abi, VOTE_ADDRESS);
  var count = await votingContract.methods.pollCount().call();
  count = Number(count);
  var data = [];
  for (let i = count; i > 0; i--) {
    var datai = await votingContract.methods.polls(i).call();
    console.log(datai);

    const dataii = {};
    dataii.id = Number(datai.id);
    [dataii.title, dataii.text] = datai.content.split("|");
    dataii.status =
      status[await votingContract.methods.state(dataii.id).call()];

    dataii.start = datai.startTimeStamp;
    dataii.end = +dataii.start + +datai.duration;
    console.log(" duration = ", dataii.duration);
    console.log(" start = ", dataii.start);
    console.log(" end= ", dataii.end);
    dataii.for = Number(datai.numberVote);
    dataii.against = Number(0);
    //dataii.pubKey = await votingContract.methods.ge
    dataii.pubKey = datai.publicKey;
    dataii.metrics = [
      {
        name: "Snapshot token",
        factor: 1,
        isZiden: false,
      },
      {
        name: "Credit score",
        factor: 0,
        isZiden: true,
      },
      {
        name: "Trava Reputation",
        factor: 1,
        isZiden: true,
      },
    ];
    data.push(dataii);
  }
  await wait(500);
  return data;
}
