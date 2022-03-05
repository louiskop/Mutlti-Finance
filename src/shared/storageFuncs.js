
const { ipcRenderer } = window.require('electron');
const { channels } = require('./constants');

export function loadSavedData() {
    ipcRenderer.send(channels.FETCH_DATA_FROM_STORAGE, "accounts");
}

export function saveDataInStorage(account) {
    ipcRenderer.send(channels.SAVE_DATA_IN_STORAGE, account);
}
