import { useEffect, useState } from "react";
import { fetchMetric } from "../../helper/api";

const transferData = ({ data, setPopup }) => {
    if (data.name == "Snapshot Token") {
        return <div className="metric_content">
            <div className="h_left">Your Amount: </div>
            <div className="h_right">{data.amount}</div>
            <div className="h_left">Your Voting Power: </div>
            <div className="h_right">{data.amount * data.factor}</div>
        </div>
    }
    else if (data.amount) {
        return <div className="metric_content">
            <div className="h_left">Your Amount: </div>
            <div className="h_right">{data.amount}</div>
            <div className="h_left">Your Voting Power: </div>
            <div className="h_right">{data.amount * data.factor}</div>
            <button className="generate" onClick={() => { setPopup({ action: "register", metric: data }) }}>Regenerate</button>
        </div>
    }
    else {
        return <div className="metric_content">
            <button className="generate" onClick={() => { setPopup({ action: "register", metric: data }) }}>Generate</button>
        </div>
    }
}

function Metric({ data, setPopup }) {

    return (<div className="metric">
        <div className="metric_header">
            <div className="metric_name">{data.name}</div>
            <div className="metric_factor"> Factor: {data.factor}</div>
        </div>

        {transferData({ data, setPopup })}
    </div>);
}

export default Metric;