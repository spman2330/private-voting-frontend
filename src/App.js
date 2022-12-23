import React, { useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";
import "./App.css";
import {
    Redirect,
    Route,
    BrowserRouter as Router,
    Switch,
} from "react-router-dom";

import { useWeb3Context } from "./contexts/web3-context"
import { useContractContext } from "./contexts/contract-context";
const App = () => {
    const {
        chain,
        address,
    } = useWeb3Context();
    const [name, setName] = useState();
    const { tokenCallContract } = useContractContext();
    useEffect(() => {
        const fetchData = async () => {
            const tokenName = await tokenCallContract.name();
            setName(tokenName);
        }
        fetchData().catch(console.error);
    }, []);
    return (
        <div>
            <h1>{chain.name}</h1>
            <h1>{address}</h1>
            <h1> {name}</h1>
        </div>
    );
};
export default App;