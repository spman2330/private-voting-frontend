import { useState } from "react";
import { votePoll } from "../../../helper/api";


function Option({ id, voting_power, setPopup }) {

    const [loading, setLoading] = useState(false);
    const closeModal = () => {
        setPopup({ action: "none" });
    }

    return (

        <div className="popup_content">
            <div className="h4 mb-4">Your Voting Power: {voting_power}</div>
            <div class="input-group mb-3">
                <input type="text" class="form-control" id="vote_for" aria-describedby="basic-addon3" />
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon3">Vote For</span>
                </div>
            </div>
            <div class="input-group mb-3">
                <input type="text" class="form-control" id="vote_against" aria-describedby="basic-addon3" />
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon3">Vote Against</span>
                </div>
            </div>

            <div className="d-flex justify-content-end">
                {
                    loading ? <button class="btn btn-outline-dark" type="button" disabled>
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Loading...
                    </button>
                        : <button id="vote_button" className="btn btn-outline-dark" onClick={async () => {

                            const yes = document.getElementById("vote_for").value;
                            const no = document.getElementById("vote_against").value;
                            try {
                                setLoading(true);
                                await votePoll(id, yes, no);
                                setPopup({ action: "done" })
                            } catch (error) {
                                console.log(error);
                                alert(error)
                                setPopup({ action: "none" });
                            }

                        }}>Confirm</button>
                }

            </div>
        </div>
    );
}

export default Option;