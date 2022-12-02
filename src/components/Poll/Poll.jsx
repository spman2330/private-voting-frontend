import React from 'react';
const Poll = ({ poll, setPage }) => {
    const handleClick = () => {
        setPage("Menu");
    }
    const handleRegister = () => {
        setPage("Register");
    }
    return (
        <div id="poll" class="row border border-black">
            <div class="row">
                <button class="col-1" onClick={handleClick}>Back</button>
            </div>
            <div class="row">
                <div class="col-3"> {poll.title}</div>
                <div class="col-2 border"> {poll.status}</div>
                {poll.status === "activate" &&
                    <div class="col-4">
                        <button onClick={handleRegister}>Register Voting Power</button>
                    </div>
                }
            </div>
            <div class="row">
                <div class="col-3">Start: {poll.start}</div>
                <div class="col-3">Close: {poll.end}</div>
            </div>
            <div class="row">
                {poll.status !== "closed" ?
                    <>Voting results will be announced only after voting ends</> :
                    <>
                        <div class="row"> For: {poll.for}</div>
                        <div class="row">Against: {poll.against}</div>
                    </>
                }
            </div>
            <div class="row">
                Description
            </div>
            <div class="row border border-black">
                {poll.text}
            </div>
            <div class="row">
                Dao manager public key: {poll.pub}
            </div>
            <div class="row">
                Metrics
                {poll.metrics.map(metric => <Metric metric={metric} />)}
            </div>
        </div>
    );
};
const Metric = ({ metric }) => {
    return (
        <div class="row border border-black">
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