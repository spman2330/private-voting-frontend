import React from 'react';

const Bar = ({ address, setAddress }) => {

    const connectWallet = () => {
        // logic connect wallet
        setAddress('0xa8C8d2E38407377bCF82d5AAe4783efaB87044f1');
    }
    return (
        <div id="bar" class="border border-dark row" >
            <div id="logo" class="col-1">logo</div>
            <div id="title" class="col-8">Private Voting</div>
            <div id="wallet" class="col-3">
                {address ? address : <button onClick={connectWallet}>Connect wallet</button>}
            </div>
        </div>
    );

};
export default Bar;