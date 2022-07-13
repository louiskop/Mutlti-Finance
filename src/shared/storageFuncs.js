
const { ipcRenderer } = window.require('electron');
const { channels } = require('./constants');

export function loadSavedData() {
    ipcRenderer.send(channels.FETCH_DATA_FROM_STORAGE, "accounts");
}

export function saveDataInStorage(account) {
    ipcRenderer.send(channels.SAVE_DATA_IN_STORAGE, account);
}

export function deleteDataInStorage(account) {
    ipcRenderer.send(channels.DELETE_DATA_IN_STORAGE, account);
}

export function fetchTrans() {
    ipcRenderer.send(channels.FETCH_TRANS, "trans");
}

export function saveTrans(trans) {
    ipcRenderer.send(channels.SAVE_TRANS, trans);
}