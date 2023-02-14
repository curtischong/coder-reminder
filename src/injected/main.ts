// This file is used to mount the injected onto the webpage
import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./app";

const body = document.getElementsByTagName("body");

// We have to put the injected into this div or else the injected will take up the whole screen
const appContainer = document.createElement("div");
appContainer.setAttribute("aria-hidden", "true");
body[0]?.prepend(appContainer);
body[0]?.prepend("");

ReactDOM.render(React.createElement(App, {}), appContainer);
