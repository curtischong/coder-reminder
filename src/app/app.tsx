import * as React from "react";
import { useEffect, useRef } from "react";
import { StorageManager } from "../storage/StorageManager";
import "./app.css";
import "../index.css"; // needed for tailwind
import ToasterPopup, { NotifyMsg } from "./ToastPopup/ToasterPopup";

interface Search {
    url: string;
    date: Date;
}

export const App: React.FC = () => {
    const storageManager = useRef(new StorageManager());
    const [notifyMsg, setNotifyMsg] = React.useState<NotifyMsg | null>(null);

    const historyKey = "visitHistory";
    const durationInHistorySecs = 60 * 60; // 60 seconds * 60 minutes = 1 hour
    // durationInHistorySecs = 30;
    // 3 is a good maxSearchCount
    //const maxSearchCount = 3; // the maximum number of times we see this website before we get an alert
    const maxSearchCount = 1; // the maximum number of times we see this website before we get an alert

    useEffect(() => {
        setNotifyMsg({ msg: "hi", nonce: "asd" });
        const url = location.href;
        if (!url.startsWith("https://www.google.com/")) {
            // we are only interested in queries the user makes on google
            // we should consider other search sites like stackoverflow in the future
            // It's up to debate whether google/gitlab should be in here, since they
            // will most likely be searching through internal company code, which is not really "blindly googling"
            // however, perhaps it should as they are searching for the same things without success
            // although, it will depend on the number of results and which results they are clicking on
            // return;
        }
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
                // setNotifyMsg({
                //     msg: `You have been searching the same terms frequently. Take a break and ask yourself:
                // 1) Why is this issue occurring?
                // 2) Can we use a workaround instead?
                // `,
                //     nonce: new Date().toString(),
                // });
            }
        });
    }, []);

    const searchExceedsLimit = (history: Search[], url: string): boolean => {
        // reduce to a count of all unique URLs
        const cnts = new Map<string, number>();
        for (const search of history) {
            const oldCnt = cnts.get(search.url) || 0;
            cnts.set(search.url, oldCnt + 1);
        }
        return (cnts.get(url) || 0) > maxSearchCount;
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
            .catch((err) => console.error(`Cannot record current url into history err=${err}`));
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

    return (
        <div id="example-app">
            <ToasterPopup notifyMsg={notifyMsg} />
        </div>
    );
};
