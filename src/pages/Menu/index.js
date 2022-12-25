import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useVotingContext } from "../../contexts/voting-context";
function Menu() {
    const { polls } = useVotingContext();
    const navigate = useNavigate();



    console.log(polls, 2)
    return (<div>
        <div class="h2 mb-4">Proposals</div>
        <div class="list-group list-group-checkable d-grid gap-2 border-0 ">
            {
                polls.map(poll =>
                    <div
                        class="list-group-item rounded-3 py-3"
                        onClick={() => navigate((poll.id).toString())}
                    >
                        <div>
                            <div class="h5">{(poll.tittle)}</div>
                            <div>{poll.status}</div>
                        </div>
                        <div class="align-items-center d-flex">
                            <div class="col-8">
                                <div>start: {(poll.startTimeStamp).toString()}</div>
                                <div>end: {(poll.startTimeStamp + poll.duration).toString()}</div>
                            </div>

                            {poll.status !== "Done" ? (
                                <div class="text-secondary">
                                    Voting results will be announced only after done
                                </div>
                            ) : (
                                <div>
                                    <div class="h6"> value vote: {(poll.numberVote).toString()}</div>
                                </div>
                            )}
                        </div>
                    </div>
                )
            }
        </div>
    </div>);
}

export default Menu;
