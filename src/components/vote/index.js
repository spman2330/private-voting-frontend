import Metric from "./metric";
import { useState, useEffect } from "react";
import { fetchMetric } from "../../helper/api";
import Option from "./popup/option";
import Register from "./popup/register";


function VotePage({ proposal, setPage }) {
    const [metrics, setMetrics] = useState([]);
    const [popup, setPopup] = useState({ action: "none" });

    var voting_power = metrics.reduce((sum, e) => sum + (e.amount * e.factor), 0)

    fetchMetric(proposal.id)
        .then(data => {
            if (JSON.stringify(metrics) !== JSON.stringify(data))
                setMetrics(data);
        })
        .catch(error => {
            console.log(error);
        })

    const handleClick = () => {
        setPage("Poll");
    }
    useEffect(() => {
        if (popup.action === "done") {
            setPage("Poll");
        }
    }, [popup]);
    return (
        <div className="vote_page">
            <div class="row">
                <button class="col-1" onClick={handleClick}>Back</button>
            </div>
            <div className="proposal_title"> {proposal.title} </div>
            <div className="h_left"> Your current voting power:</div>
            <div className="h_right"> {voting_power}</div>
            <button className="vote_button" onClick={() => setPopup({ action: "vote" })}>Vote</button>
            <div className="vote_content">
                {metrics.map((data, index) => <Metric data={data} key={index} setPopup={setPopup}></Metric>)}
            </div>=
            {(popup.action === "none" || popup.action === "done") ? null : (popup.action === "vote" ? <Option voting_power={voting_power} setPopup={setPopup} id={proposal.id} /> :
                <Register metric={popup.metric} setPopup={setPopup} />)}


        </div >);
}

export default VotePage;