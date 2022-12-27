import { createContext, useState, useMemo, useContext, useEffect } from "react";
import { useContractContext } from "../contract-context";
import { useWeb3Context } from "../web3-context";

const VotingContext = createContext({})
const status = ["Pending", "Active", "Done", "Canceled", "Succeeded"];
const css_status = ["text-primary", "text-primary", "text-danger", "", "text-success"];
const BigInt = window.BigInt;
const snarkjs = window.snarkjs;
export function VotingProvider({ children }) {
    const { votingCallContract, votingTransContract, tokenCallContract, registerCallContract } = useContractContext();

    const { address } = useWeb3Context();
    const [polls, setPolls] = useState([]);
    const getList = async () => {
        const pollss = [];
        const pollCount = await votingCallContract.pollCount();
        for (var i = pollCount; i; i--) {
            const poll = await votingCallContract.polls(i);
            const state = (await votingCallContract.state(i)).toString()
            const stt = status[state];

            pollss.push({ ...poll, status: status[state], css_status: css_status[state] });
        }
        setPolls(pollss);
    }

    useEffect(() => {
        getList();
    }, [])
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
    console.log(registerCallContract, "register");
    const getVotingPower = async (startTimeStamp) => {
        return (await tokenCallContract.getPriorVotes(address, startTimeStamp));
    }





    const votePoll = async (id, vote, sign, pubKey, power, proofsZiden) => {
        vote = BigInt(vote);
        var power = BigInt(power);
        var r = BigInt(Math.floor(Math.random() * 1000));
        var kx = BigInt(Math.floor(Math.random() * 1000));
        var kr = BigInt(Math.floor(Math.random() * 1000));
        pubKey = BigInt(pubKey.toString());

        const PUBLIC_URL = window.location.origin;
        var { proof, publicSignals } = await snarkjs.groth16.fullProve(
            {
                xFake: vote,
                sign,
                X: power,
                r,
                g: 7907,
                h: 7867,
                D: pubKey,
                kX: kx,
                kR: kr,
            },
            PUBLIC_URL + "/vote.wasm",
            PUBLIC_URL + "/vote.zkey"
        );

        const { a, b, c, publicInputs } = await genCallData(proof, publicSignals)

        await votingTransContract.votePoll(a, b, c, id, publicInputs[0], [publicInputs[1], publicInputs[2], publicInputs[3], publicInputs[4]], proofsZiden, { gasLimit: 3e6 });

    }

    return (<VotingContext.Provider value={{ polls, votePoll, getVotingPower }}>
        {children}
    </VotingContext.Provider>)

}

export const useVotingContext = () => useContext(VotingContext);