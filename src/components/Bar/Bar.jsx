import React from 'react';
import { connectMetamask } from '../../helper/api';
import logo from "./logo192.png"
const Bar = ({ address, setAddress }) => {

    const connectWallet = async () => {

        var walletAddress = await connectMetamask();
        setAddress(walletAddress);
    }
    return (
        <div id="bar" class="p-3 text-bg-dark fixed-top" >
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <div class="col-1"><img src={logo} alt="My logo" /></div>
                <div id="title" class="col-9 h3">Private Voting</div>
                <div id="wallet" class="col-2">
                    {address != '...' ? address : <button className="btn btn-outline-light me-2 text-end" onClick={connectWallet}>Connect wallet</button>}
                </div>
            </div>
        </div>
    );

};
export default Bar;