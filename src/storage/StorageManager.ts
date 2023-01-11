// This file is responsible for CRUD in Chrome's storage system

export class StorageManager {
    async fetchItem(key: string): Promise<any> {
        return new Promise((resolve, reject) => {
            chrome.storage.local.get(key, (items: { [key: string]: any }): void => {
                resolve(items[key]);
            });
        });
    }

    async insertItem(key: string, items: any): Promise<void> {
        return new Promise((resolve, reject) => {
            chrome.storage.local.set({ [key]: items }, resolve);
        });
    }

    async clearStorage(): Promise<void> {
        return new Promise((resolve, reject) => {
            chrome.storage.local.clear(resolve);
        });
    }

    printStorage(): void {
        chrome.storage.local.get((items) => {
            console.log(items);
        });
    }
}
