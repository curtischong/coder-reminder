import * as React from "react";
import { useEffect } from "react";
import "./ToastPopup.css";

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
        const x = document.getElementById("toaster");
        if (!x) {
            console.error(`Smart Paste cannot create toast element. msg=`, msg);
            return;
        }

        x.className = "show";
    }, [notifyMsg]);

    return (
        <>
            <div id="toaster">{notifyMsg && notifyMsg.msg}</div>
        </>
    );
}
