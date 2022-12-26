// This file is responsible for CRUD in Chrome's storage system

export class StorageManager {
    async fetchItem(key: string): Promise<any> {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get(key, (items: { [key: string]: any }): void => {
                resolve(items[key]);
            });
        });
    }

    async insertItem(key: string, items: any): Promise<void> {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.set({ [key]: items }, resolve);
        });
    }

    async clearStorage(): Promise<void> {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.clear(resolve);
        });
    }

    printStorage(): void {
        chrome.storage.sync.get((items) => {
            console.log(items);
        });
    }
}