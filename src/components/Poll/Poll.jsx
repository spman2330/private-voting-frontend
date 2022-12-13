import React from 'react';
import { convertTime } from '../../helper/api';
const Poll = ({ poll, setPage }) => {
    const handleClick = () => {
        setPage("Menu");
    }
    const handleRegister = () => {
        setPage("Register");
    }
    var css_status;
    if (poll.status == "Succeeded") css_status = "text-success";
    else if (poll.status == "Done") css_status = "text-danger";
    else css_status = "text-primary";
    return (
        <div id="poll">

            <button class="btn btn-outline-dark" onClick={handleClick}>Back</button>
            <div >
                <div class="col-3 h2"> {poll.title}</div>
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <div class={css_status}> {poll.status}</div>
                    {poll.status === "Active" &&
                        <div>
                            <button class="btn btn-outline-dark" onClick={handleRegister}>Register Voting Power</button>
                        </div>
                    }
                </div>


            </div>
            <div class="d-flex">
                <div class="col-3 h6">Start: {convertTime(poll.start)}</div>
                <div class="col-3 h6">Close: {convertTime(poll.end)}</div>
            </div>
            <div class="mb-3">
                {poll.status !== "Done" ?
                    <div>Voting results will be announced only after voting ends</div> :
                    <div>
                        <div class="h5"> For: {poll.for}</div>
                        <div class="h5">Against: {poll.against}</div>
                    </div>
                }
            </div>
            <div class="rounded-3 p-3 border border-dark mb-3">
                <div class="h4">
                    Description
                </div>
                <div>
                    {poll.text}
                </div>
            </div>

            <div class="h5">
                Dao manager public key:
            </div>
            <div >
                {poll.pubKey[0].toString()}
            </div>
            <div>
                {poll.pubKey[1].toString()}
            </div>
            <div class="mt-3">
                <div class="h5">Metrics</div>
                <div class="list-group list-group-checkable d-grid gap-1 border-0">
                    {poll.metrics.map(metric => <Metric metric={metric} />)}
                </div>

            </div>
        </div>
    );
};
const Metric = ({ metric }) => {
    return (
        <div class="list-group-item rounded-3 py-2 d-flex">
            <div class="col-7">
                {metric.name}
            </div>
            <div class="col-3">
                {metric.factor}
            </div>
            <div class="col-2">
                <a>Detail</a>
            </div>
        </div>
    );
};
export default Poll;