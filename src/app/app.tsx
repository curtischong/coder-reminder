import * as React from "react";
import { useEffect, useRef } from "react";
import { StorageManager } from "../storage/StorageManager";
import "./app.css";
import "../index.css"; // needed for tailwind
import ToasterPopup, { NotifyMsg } from "./ToastPopup/ToasterPopup";
import * as ReactDOM from "react-dom";

interface Search {
    url: string;
    date: Date;
}

export const App: React.FC = () => {
    const storageManager = useRef(new StorageManager());

    const historyKey = "visitHistory";
    const durationInHistorySecs = 60 * 60; // 60 seconds * 60 minutes = 1 hour
    // durationInHistorySecs = 30;
    // 3 is a good MAX_SEARCH_CNT
    //const MAX_SEARCH_CNT = 3; // the maximum number of times we see this website before we get an alert
    const MAX_SEARCH_CNT = 1; // the maximum number of times we see this website before we get an alert

    useEffect(() => {
        // setNotifyMsg({ nonce: "asd" });
        const url = location.href;
        storageManager.current.fetchItem(historyKey).then((serialized: Search[]) => {
            const history = !serialized
                ? []
                : serialized.map((search) => {
                      return {
                          url: search.url,
                          date: new Date(search.date),
                      };
                  });
            updateHistory(history, url);
            if (searchExceedsLimit(history, url)) {
                notifyUser({
                    nonce: new Date().toString(),
                });
            }
        });
    }, []);

    const notifyUser = (notifyMsg: NotifyMsg) => {
        const mountNode = document.getElementById("coder-reminder");
        ReactDOM.render(<ToasterPopup notifyMsg={notifyMsg} />, mountNode);
    };

    const searchExceedsLimit = (history: Search[], url: string): boolean => {
        // reduce to a count of all unique URLs
        const cnts = new Map<string, number>();
        for (const search of history) {
            const oldCnt = cnts.get(search.url) || 0;
            cnts.set(search.url, oldCnt + 1);
        }
        const urlCnt = cnts.get(url) || 0;
        return urlCnt > MAX_SEARCH_CNT;
    };

    const updateHistory = (history: Search[], url: string): void => {
        const now = new Date();
        discardOldSearches(history, now);

        history.push({
            url,
            date: now,
        });
        const serialized = history.map((search) => {
            return {
                url: search.url,
                date: search.date.toJSON(),
            };
        });
        storageManager.current
            .insertItem(historyKey, serialized)
            .catch((err) => console.error(`Cannot record current url into history err =${err}`));
    };

    const discardOldSearches = (history: Search[], now: Date): void => {
        let i = 0;
        for (; i < history.length; i++) {
            const search = history[i];
            if (now.getTime() - search.date.getTime() < durationInHistorySecs * 1000) {
                break;
            }
        }
        history.splice(0, i);
    };

    return <div id="coder-reminder" />;
};
