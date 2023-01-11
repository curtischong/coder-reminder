import * as React from "react";

import "./CloseBtn.css";

interface CloseBtnProps {
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export default function CloseBtn({ onClick }: CloseBtnProps) {
    // tabIndex makes the div focusable
    return (
        <div onClick={onClick} className="close-con">
            <div className="close" tabIndex={1}></div>
        </div>
    );
}
