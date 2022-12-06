import React from 'react';
import { connectMetamask } from '../../helper/api';
// import token from "../contracts/Token.json"
// import vote from "../contracts/Voting.json"

const Bar = ({ address, setAddress }) => {

    const connectWallet = async () => {

        var walletAddress = await connectMetamask();
        setAddress(walletAddress);
    }
    return (
        <div id="bar" class="border border-dark row" >
            <div id="logo" class="col-1">logo</div>
            <div id="title" class="col-8">Private Voting</div>
            <div id="wallet" class="col-3">
                {address != '...' ? address : <button onClick={connectWallet}>Connect wallet</button>}
            </div>
        </div>
    );

};
export default Bar;