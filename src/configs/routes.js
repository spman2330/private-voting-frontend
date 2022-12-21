import React from "react";

export default [
    {
        path: "/menu",
        component: React.lazy(() => import("../pages/Menu")),
    },
    {
        path: "/poll",
        component: React.lazy(() => import("../pages/Poll")),
    },
    {
        path: "/voting",
        component: React.lazy(() => import("../pages/Voting")),
    },
]