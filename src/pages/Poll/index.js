import { useVotingContext } from "../../contexts/voting-context";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Poll() {
    let { id } = useParams()
    const navigate = useNavigate()
    const { polls } = useVotingContext();
    const poll = polls[polls.length - id];

    return (<div>
        <div id="poll">
            <button class="btn btn-outline-dark" onClick={() => navigate("../")} >
                Back
            </button>
            <div>
                <div class="col-3 h2"> {poll.tittle}</div>
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <div > {poll.status}</div>
                    {poll.status === "Active" && (
                        <div>
                            <button class="btn btn-outline-dark" onClick={() => navigate("../voting/" + id)} >
                                Register Voting Power
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div class="d-flex">
                <div class="col-3 h6">Start: {(poll.startTimeStamp)}</div>
                <div class="col-3 h6">Close: {(poll.startTimeStamp + poll.duration)}</div>
            </div>
            <div class="mb-3">
                {poll.status !== "Done" ? (
                    <div className="text-danger">
                        Voting results will be announced only after voting ends
                    </div>
                ) : (
                    <div>
                        <div class="h5"> Value For: {(poll.numberVote).toString()}</div>
                    </div>
                )}
            </div>
            <div class="rounded-3 p-3 border border-dark mb-3">
                <div class="h4">Description</div>
                <div>{poll.content}</div>
            </div>

            <div class="h5">Dao manager public key:</div>
            <div>{(poll.publicKey).toString()}</div>
        </div>
    </div>);
}

export default Poll;