import React, { useState, useEffect } from 'react';
const mockData = {
    id: "102",
    title: "title-02",
    status: "activate",
    start: "July 7th, 2022",
    end: "August 7th, 2022",
    text: "sdasdsadsad",
    pub: "0xabd.......",
    metrics:

        [
            {
                title: 'Snapshot Token',
                amount: 1000,
                factor: 2,
                isZiden: false
            },
            {
                title: 'Credit Score',
                amount: 500,
                factor: 2,
                isZiden: true,
                isGenerate: true
            },
            {
                title: 'Trava Reputation',
                amount: 0,
                factor: 1,
                isZiden: true,
                isGenerate: false
            }
        ]
}
const pollTemp = {
    id: "",
    title: "",
    status: "",
    start: "",
    end: "",
    text: "",
    pub: "",
    metrics: []
}
const Voting = ({ pollId, setPage }) => {
    const [poll, setPoll] = useState(pollTemp);
    const [votingPower, setVotingPower] = useState();
    const [popupData, setPopupData] = useState({});
    const handleClick = () => {
        setPage("Poll");
    }
    var voteAction;
    var valueAction;
    useEffect(() => {
        // get metrics by poll and address ?
        setPoll(mockData);
        var temp = poll.metrics.reduce((sum, e) => sum + (e.amount * e.factor), 0);
        setVotingPower(temp);
    });
    const setAction = (action, value) => {
        voteAction = action;
        valueAction = value;
    }
    return (
        <div id="voting" class="row border border-black">
            <div class="row">
                <button class="col-1" onClick={handleClick}>Back</button>
            </div>
            <div class="row">
                <div class="col-3"> {poll.title}</div>
                <div class="col-2"> {votingPower}</div>
                <div class="col-4">
                    <button onClick={setAction("vote", votingPower)}>Vote</button>
                </div>
            </div>
            {poll.metrics.map(metric => <Metric metric={metric} action={setAction} />)}
            <Popup action={voteAction} value={valueAction} setValue={setAction} />
        </div>
    );
};
const Metric = ({ metric, setMetric }) => {
    const setAction = (value1, value2) => {
        // action(value1, value2);
    }
    return (
        <div class="row">
            <div class="row border">
                <div class="col-2">{metric.title}</div>
                <div class="col-6">{metric.factor}</div>
                {metric.isZiden && !metric.isGenerate &&
                    <div class="col-4">
                        <button onClick={setAction('Generate', metric)}>Generate</button>
                    </div>
                }
            </div>
            {(!metric.isZiden || metric.isGenerate) &&
                <div class="row border">
                    <div class="col-8">
                        <div class="row">
                            <div class="col-3">Your amount</div>
                            <div class="col-2">{metric.amount}</div>
                        </div>
                        <div class="row">
                            <div class="col-3">Your voting power</div>
                            <div class="col-2">{metric.amount * metric.factor}</div>
                        </div>
                    </div>
                    {metric.isZiden &&
                        <div class="col-4">
                            <button onClick={setAction('Generate', metric)}>ReGenerate</button>
                        </div>
                    }
                </div>
            }
        </div>
    );
}
const Popup = ({ action, value, setAction }) => {
    const handleVote = () => {

    }
    const handleZidenPassword = () => {
        setAction("Register", value);
    }
    return (
        <div class="row">
            {action == "vote" &&
                <>
                    <div>
                        Your options
                    </div>
                    <div>
                        <div>Your Voting Power:</div>
                        <div>{value}</div>
                        <div>Vote for</div>
                        <input id="voteFor"></input>
                        <div>Vote against</div>
                        <input id="voteAgainst"></input>
                        <button onClick={handleVote}>Confirm</button>
                    </div>
                </>
            }
            {action == "Generate" &&
                <>
                    <div>Enter Ziden Password</div>
                    <input id="password"></input>
                    <button onClick={handleZidenPassword}></button>
                </>
            }
            {action == "Register" &&
                <>
                    <div>Your current</div>
                    <div></div>
                    <div></div>
                </>
            }
        </div>
    );
}
export default Voting;