// This file is used to mount the app onto the webpage
import * as React from "react";
import * as ReactDOM from "react-dom";
import "../index.css";
import { App } from "./app";

const body = document.getElementsByTagName("body");

// We have to put the app into this div or else the app will take up the whole screen
const appContainer = document.createElement("div");
appContainer.setAttribute("aria-hidden", "true");
body[0]?.prepend(appContainer);
body[0]?.prepend("");

ReactDOM.render(React.createElement(App, {}), appContainer);
