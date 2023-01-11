import * as React from "react";
import { useEffect } from "react";
import "./ToasterPopup.css";
import CloseBtn from "../../components/CloseBtn/CloseBtn";

export interface NotifyMsg {
    nonce: string;
}

interface ToasterPopupProps {
    notifyMsg: NotifyMsg | null;
}

// the nonce is to get the function to update
export default function ToasterPopup({ notifyMsg }: ToasterPopupProps) {
    useEffect(() => {
        if (!notifyMsg) return;
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
                <div style={{ marginTop: "10px" }}>
                    You have been searching the same terms frequently. Take a break and ask
                    yourself:
                    <br />
                    1) Why is this issue occurring?
                    <br />
                    2) Can we use a workaround instead?
                </div>
            </div>
        </>
    );
}
