
// package imports
const { app, BrowserWindow} = require('electron');
const isDev = require('electron-is-dev');
const { ipcMain } = require('electron/main');
const { channels } = require('../src/shared/constants');


let mainWindow;

function createWindow() {

    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        frame: false,
        autoHideMenuBar: true,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true
        }
    });

    const startUrl = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html' )}`;

    mainWindow.loadURL(startUrl);

    mainWindow.once('ready-to-show', () => mainWindow.show());
    mainWindow.on('closed', () => mainWindow = null);

}

app.on('ready', createWindow);


// listen for messages from react

// window events
ipcMain.on(channels.MIN_WINDOW, (event, arg) => {

    mainWindow.minimize();

});

ipcMain.on(channels.CLOSE_WINDOW, (event, arg) => {

    mainWindow.close();

});

// storage events
ipcMain.on(channels.FETCH_DATA_FROM_STORAGE, (event, message) => {

    console.log("[+] Electron received: FETCH_DATA_FROM_STORAGE with a message:" , message);

    console.log("[+] Sending message on channel HANDLE_FETCH_DATA from Electron with message");

    mainWindow.send(channels.HANDLE_FETCH_DATA, {
        success: true,
        message: message,
    });

});

ipcMain.on(channels.SAVE_DATA_IN_STORAGE, (event, message) => {

    console.log("[+] Electron received: SAVE_DATA_IN_STORAGE with a message:" , message);

    console.log("[+] Sending message on channel HANDLE_SAVE_DATA from Electron with message");

    mainWindow.send(channels.HANDLE_SAVE_DATA, {
        success: true,
        message: message,
    });

});

