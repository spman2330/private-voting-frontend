import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./Main.css";
import Bar from "../Bar/Bar";
import Menu from "../Menu/Menu";
import Poll from "../Poll/Poll";
import VotePage from "../vote/index"
import { getListPoll, reduce } from '../../helper/api';
import { ethers } from "ethers";
const mockData = {
    polls: [{
        id: 12,
        title: "title-01",
        status: "pending",
        start: "July 7th, 2022",
        end: "August 7th, 2022",
        text: "sdasdsadsad",
        pub: "0xabd.......",
        metrics: [
            {
                name: "Snapshot token",
                factor: 2,
                isZiden: false
            },
            {
                name: "Credit score",
                factor: 1,
                isZiden: true
            },
            {
                name: "Trava Reputation",
                factor: 1,
                isZiden: true
            }
        ]
    }, {
        id: 1,
        title: "title-02",
        status: "activate",
        start: "July 7th, 2022",
        end: "August 7th, 2022",
        text: "sdasdsadsad",
        pub: "0xabd.......",
        metrics: [
            {
                name: "Snapshot token",
                factor: 2,
                isZiden: false
            },
            {
                name: "Credit score",
                factor: 1,
                isZiden: true
            },
            {
                name: "Trava Reputation",
                factor: 1,
                isZiden: true
            }
        ]
    }, {
        id: 13,
        title: "title-03",
        status: "closed",
        start: "July 7th, 2022",
        end: "August 7th, 2022",
        for: '10M',
        forPercent: 0.5,
        against: '1M',
        againstPercent: 0.1,
        text: "sdasdsadsad",
        pub: "0xabd.......",
        metrics: [
            {
                name: "Snapshot token",
                factor: 2,
                isZiden: false
            },
            {
                name: "Credit score",
                factor: 1,
                isZiden: true
            },
            {
                name: "Trava Reputation",
                factor: 1,
                isZiden: true
            }
        ]
    }
    ]
}
const Main = () => {

    const [address, setAddress] = useState('');
    const [polls, setPolls] = useState([]);
    const [page, setPage] = useState("Menu");
    const [pollId, setPollId] = useState();
    useEffect(() => {
        const checkConnection = async () => {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const addresses = await provider.listAccounts();
            if (addresses.length) {
                const walletAddress = addresses[0];
                setAddress(walletAddress);
                var list = await getListPoll(walletAddress);
                setPolls(list);
            }

        };
        checkConnection();
    }, [address, polls]);

    return (
        <div id="main" class="container">
            <Bar address={reduce(address)} setAddress={setAddress} />
            {page == "Menu" && < Menu polls={polls} setPage={setPage} setPollId={setPollId} />}
            {page == "Poll" && < Poll poll={polls.find(poll => poll.id === pollId)} setPage={setPage} />}
            {page == "Register" && <VotePage proposal={polls.find(poll => poll.id === pollId)} />}
            {/* <Voting pollId={pollId} setPage={setPage} />}
             */}
        </div>
    );

};

export default Main;
