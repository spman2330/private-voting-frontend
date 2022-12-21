import React, { useEffect } from "react";
import "./App.css";
import {
    Redirect,
    Route,
    BrowserRouter as Router,
    Switch,
} from "react-router-dom";
import { useWeb3Context } from "./contexts/web3-context/index"
const App = () => {
    const {
        chain,
        address,
    } = useWeb3Context();
    return (
        <div>
            <h1>{address}</h1>
            <h1>{chain.name}</h1>
        </div>
    );
};
export default App;