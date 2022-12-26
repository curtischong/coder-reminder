import * as React from "react";
import { ReactElement } from "react";

import "./thin-line.css";

interface Props {
    isDarkMode: boolean;
}

export const ThinLine = ({ isDarkMode }: Props): ReactElement => {
    return <hr className={`thin-line ${isDarkMode ? "thin-line-dark" : ""}`} />;
};