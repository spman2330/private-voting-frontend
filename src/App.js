import React, { useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";
import "./App.css";
import {
    BrowserRouter,
    useRoutes,

} from "react-router-dom";

import routes from "./configs/routes";
const App = () => {

    return (
        <div>
            {useRoutes(routes)}
        </div>




    );
};
export default App;