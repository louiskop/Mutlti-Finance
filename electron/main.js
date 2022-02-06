
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
ipcMain.on(channels.MIN_WINDOW, (event, arg) => {

    mainWindow.minimize();

});

ipcMain.on(channels.CLOSE_WINDOW, (event, arg) => {

    mainWindow.close();

});