import { votePoll } from "../../../helper/api";


function Option({ id, voting_power, setPopup }) {

    return (<div className="popup">
        <div className="popup_inner">
            <div className="popup_header">
                Your Options
            </div>
            <div className="popup_content">
                <div className="h_left">Your Voting Power:</div>
                <div className="h_right">{voting_power}</div>
                <div className="h_left">Vote For</div>
                <input className="box_input" id="vote_for"></input>
                <br></br>
                <div className="h_left">Vote Against</div>
                <input className="box_input" id="vote_against" ></input>
                <br></br>
                <div className="popup_button">
                    <button className="confirm" onClick={async () => {
                        const yes = document.getElementById("vote_for").value;
                        const no = document.getElementById("vote_against").value;
                        await votePoll(id, yes, no);
                        setPopup({ action: "none" })
                    }}>Confirm</button>
                </div>
            </div>
        </div>
    </div >);
}

export default Option;