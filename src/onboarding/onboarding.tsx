// This is the view you see when you click on the Chrome extension icon
import * as React from "react";
import * as ReactDOM from "react-dom";
import "../tailwind.css"; // needed for tailwind

class Onboarding extends React.Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="flex flex-col text-center">
                <h1 className="text-light-salmon">Thank you for installing!</h1>
                <h2 className="text-maya-blue">May the odds be ever in your favor</h2>
            </div>
        );
    }
}

var mountNode = document.getElementById("onboarding-body");
ReactDOM.render(<Onboarding />, mountNode);
