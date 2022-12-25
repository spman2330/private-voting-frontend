import React from "react";
import Menu from "../pages/Menu";
import Poll from "../pages/Poll";
import Voting from "../pages/Voting";
export default [
    {
        path: "",
        element: <Menu />
    },
    {
        path: ":id",
        element: <Poll />,
    },
    {
        path: "/voting/:id",
        element: <Voting />
    },
]