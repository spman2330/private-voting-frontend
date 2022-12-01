function Option({ voting_power, setPopup }) {

    return (<div className="popup">
        <div className="popup_header">
            Your Options
        </div>
        <div className="popup_content">
            <div className="h_left">Your Voting Power:</div>
            <div className="h_right">{voting_power}</div>
            <div className="h_left">Vote For</div>
            <input id="vote_for"></input>
            <div className="h_left">Vote Against</div>
            <input id="vote_againt" ></input>
            <button className="confirm" onClick={() => { setPopup({ action: "none" }) }}>Confirm</button>
        </div>
    </div>);
}

export default Option;