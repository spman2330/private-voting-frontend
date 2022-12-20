import Metric from "./metric";
import { useState, useEffect } from "react";
import { fetchMetric } from "../../helper/api";
import Option from "./popup/option";
import Register from "./popup/register";
import { Modal } from "react-bootstrap";
import { poll } from "ethers/lib/utils";

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
        <div>
            <button class="btn btn-outline-dark" onClick={handleClick}>Back</button>
            <div className="h2"> {proposal.title} </div>
            <div class="d-flex h5 align-items-center justify-content-between">
                <div> Your current voting power: {voting_power}</div>
                <button class="btn btn-outline-dark" onClick={() => setPopup({ action: "vote" })}>Vote</button>

            </div>

            <div className="list-group list-group-checkable d-grid gap-1 border-0">
                {metrics.map((data, index) => <Metric data={data} key={index} setPopup={setPopup}></Metric>)}
            </div>
            <Modal show={popup.action == "vote"}>
                <Modal.Header closeButton>
                    <Modal.Title>Your Options</Modal.Title>
                </Modal.Header>
                <Modal.Body><Option voting_power={voting_power} setPopup={setPopup} id={proposal.id} /></Modal.Body>

            </Modal>
            <Modal show={popup.action == "register"}>
                <Modal.Header closeButton>
                    <Modal.Title>Register {popup.action == "register" ? popup.metric.name : "a"} with Ziden</Modal.Title>
                </Modal.Header>
                <Modal.Body><Register metric={popup.metric} setPopup={setPopup} /></Modal.Body>

            </Modal>
            {/* {(popup.action === "none" || popup.action === "done") ? null : (popup.action === "vote" ? <Option voting_power={voting_power} setPopup={setPopup} id={proposal.id} /> :
                <Register metric={popup.metric} setPopup={setPopup} />)
            } */}


        </div >);
}

export default VotePage;