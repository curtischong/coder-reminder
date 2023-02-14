// This is the view you see when you click on the Chrome extension icon
import * as React from "react";
import * as ReactDOM from "react-dom";

class Popup extends React.Component {
    render() {
        return (
            <div>
                <div className="rounded-xl border-2 border-slate-500 bg-blue-100 p-2 px-4">hi</div>
                <p className="text-2xl text-light-salmon">hello</p>;
            </div>
        );
    }
}

const mountNode = document.getElementById("popup");
ReactDOM.render(<Popup />, mountNode);
