
const { ipcRenderer } = window.require('electron');
const { channels } = require('./constants');

export function loadSavedData() {

    console.log("[+] Sending message to channel FETCH_DATA_FROM_STORAGE from loadSavedData() (REACT)");
    ipcRenderer.send(channels.FETCH_DATA_FROM_STORAGE, "accounts");

}

export function saveDataInStorage(account) {

    console.log("[+] Sending message to channel SAVE_DATA_IN_STORAGE from saveDataInStorage() (REACT)");
    ipcRenderer.send(channels.SAVE_DATA_IN_STORAGE, account);

}
