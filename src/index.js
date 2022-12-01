import React from "react";
import VotePage from "./components/vote/index.js";
import { createRoot } from "react-dom/client";



const root = createRoot(document.getElementById("root"));
root.render(
    <VotePage proposal={{ title: "title" }} />
)
