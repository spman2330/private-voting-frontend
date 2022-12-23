import React from "react";
import Menu from "../pages/Menu";
import Poll from "../pages/Poll";
export default [
    {
        path: "",
        element: <Menu />
    },
    {
        path: "/poll",
        element: <Poll />,
    },
    // {
    //     path: "/voting",
    //     component: React.lazy(() => import("../pages/Voting")),
    // },
]