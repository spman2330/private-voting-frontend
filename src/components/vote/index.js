import Metric from "./metric";
import { fetchProposal } from "../../helper/api.js";
import { useState } from "react";
import { fetchMetric } from "../../helper/api";
import Option from "./popup/option";
import Register from "./popup/register";


function VotePage({ proposal }) {
    const [metrics, setMetrics] = useState([]);
    const [popup, setPopup] = useState({ action: "none" });

    var voting_power = metrics.reduce((sum, e) => sum + (e.amount * e.factor), 0)

    fetchMetric(proposal)
        .then(data => {
            if (JSON.stringify(metrics) !== JSON.stringify(data))
                setMetrics(data);
        })
        .catch(error => {
            console.log(error);
        })



    return (<div className="vote_page">
        <div className="proposal_title"> {proposal.title} </div>
        <div className="h_left"> Your current voting power:</div>
        <div className="h_right"> {voting_power}</div>
        <button className="vote_button" onClick={() => setPopup({ action: "vote" })}>Vote</button>
        <div className="vote_content">
            {metrics.map((data, index) => <Metric data={data} key={index} setPopup={setPopup}></Metric>)}
        </div>
        {popup.action == "none" ? null : (popup.action == "vote" ? <Option voting_power={voting_power} setPopup={setPopup} /> :
            <Register metric={popup.metric} setPopup={setPopup} />)}

    </div >);
}

export default VotePage;