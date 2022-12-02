import React from 'react';
// import token from "../contracts/Token.json"
// import vote from "../contracts/Voting.json"

const Bar = ({ address, setAddress }) => {

    const connectWallet = async () => {
        // logic connect wallet
        // await window.ethereum.request({ method: 'eth_requestAccounts' });
        // const TOKEN_ADDRESS = 0;
        // const VOTE_ADDRESS = 0;
        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        // const signer = provider.getSigner();
        // const tokenContract = new ethers.Contract(TOKEN_ADDRESS, token.abi, signer);
        // const votingContract = new ethers.Contract(VOTE_ADDRESS, vote.abi, signer);
        // localStorage.setItem("signer", JSON.stringify(signer));
        // localStorage.setItem("tokenContract", JSON.stringify(tokenContract));
        // localStorage.setItem("votingContract", JSON.stringify(votingContract));
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