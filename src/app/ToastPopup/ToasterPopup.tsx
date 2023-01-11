import * as React from "react";
import { useEffect } from "react";
import "./ToasterPopup.css";
import CloseBtn from "../../components/CloseBtn/CloseBtn";

export interface NotifyMsg {
    msg: string;
    nonce: string;
}

interface ToasterPopupProps {
    notifyMsg: NotifyMsg | null;
}

// the nonce is to get the function to update
export default function ToasterPopup({ notifyMsg }: ToasterPopupProps) {
    useEffect(() => {
        if (!notifyMsg || notifyMsg.msg === "") return;
        const msg = notifyMsg.msg;
        // Get the snackbar DIV
        const x = document.getElementById("toaster")!;
        x.className = "show";
    }, [notifyMsg]);

    return (
        <>
            <div id="toaster">
                <CloseBtn
                    onClick={() => {
                        const x = document.getElementById("toaster")!;
                        x.className = x.className.replace("show", "");
                    }}
                />
                {notifyMsg && notifyMsg.msg}
            </div>
        </>
    );
}
