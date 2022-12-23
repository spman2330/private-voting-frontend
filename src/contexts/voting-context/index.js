import { createContext, useState, useMemo, useContext } from "react";
import { useContractContext } from "../contract-context";

const VotingContext = createContext({})
const status = ["Pending", "Active", "Done", "Canceled", "Succeeded"];

export function VotingProvider({ children }) {
    const { votingCallContract } = useContractContext();
    const [polls, setPolls] = useState([]);
    const getListPoll = async () => {
        const pollss = [];
        const pollCount = await votingCallContract.pollCount();
        for (var i = pollCount; i; i--) {
            const poll = await votingCallContract.polls(i);
            const stt = status[(await votingCallContract.state(i)).toString()];
            //poll.status = "active"

            pollss.push({ ...poll, status: stt });
        }
        //console.log(pollss);
        setPolls(pollss);
    }

    const contextData = useMemo(() => {
        return {
            polls,
            getListPoll
        }
    }, [votingCallContract]);
    return (<VotingContext.Provider value={contextData}>
        {children}
    </VotingContext.Provider>)

}

export const useVotingContext = () => useContext(VotingContext);
