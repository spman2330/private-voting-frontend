import { useEffect, useState } from "react";
import { fetchMetric } from "../../helper/api";

const transferData = ({ data, setPopup }) => {
    if (data.name == "Snapshot Token") {
        return <div className="p-2 mt-2">
            <div className="h6">Your Amount: {data.amount} </div>
            <div className="h6">Your Voting Power: {data.amount * data.factor} </div>

        </div>
    }
    else if (data.amount) {
        return <div className="d-flex justify-content-between mt-2">
            <div className="p-2">
                <div className="p-2 justify-content-center">
                    <div className="h6">Your Amount: {data.amount} </div>
                    <div className="h6">Your Voting Power: {data.amount * data.factor} </div>
                </div>
            </div>
            <button class="btn btn-outline-dark m-4" onClick={() => { setPopup({ action: "register", metric: data }) }}>Regenerate</button>
        </div>

    }
    else {
        return <div className="p-2">
            <button class="btn btn-outline-dark" onClick={() => { setPopup({ action: "register", metric: data }) }}>Generate</button>
        </div>
    }
}

function Metric({ data, setPopup }) {

    return (<div className="list-group-item rounded-3 py-2">
        <div className="border-bottom justify-content-between d-flex  align-items-center">
            <div className="h5">{data.name}</div>
            <div className="h6"> Factor: {data.factor}</div>
        </div>

        {transferData({ data, setPopup })}
    </div>);
}

export default Metric;