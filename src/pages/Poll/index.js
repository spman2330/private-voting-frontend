import { useVotingContext } from "../../contexts/voting-context";
function Poll() {

    const { polls } = useVotingContext();
    console.log(polls)
    return (<div>
        abc
    </div>);
}

export default Poll;