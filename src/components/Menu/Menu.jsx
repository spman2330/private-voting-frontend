import React from 'react';
import { convertTime } from '../../helper/api';

const Menu = ({ polls, setPage, setPollId }) => {
    return (
        <div id="menu" class="row">

            <div id="title" class="row">
                <h4>Proposals</h4>
            </div>
            {polls.map(poll => <Poll key={poll.id} poll={poll} setPage={setPage} setPollId={setPollId} />)}
        </div>
    );
};

const Poll = ({ poll, setPage, setPollId }) => {
    const handleClick = () => {
        setPage("Poll");
        setPollId(poll.id);
    }
    return (
        <div id={"poll-" + poll.id} class="border border-black row mb-2" onClick={handleClick}>
            <div class="col-8">
                <div class="row">{poll.title}</div>
                <div class="row">
                    <div class="col-1">{poll.status}</div>
                    <div class="col-4">start: {convertTime(poll.start)}</div>
                    <div class="col-4">end: {convertTime(poll.end)}</div>
                </div>
            </div>
            <div class="col-4">
                {poll.status !== "Done" ?
                    <div class="row">Voting results will be announced only after done</div> :
                    <div>
                        <div class="row"> For: {poll.for}</div>
                        <div class="row">Against: {poll.against}</div>
                    </div>
                }
            </div>
        </div >
    );
};
export default Menu;
