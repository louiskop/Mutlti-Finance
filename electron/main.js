
// package imports
const { app, BrowserWindow} = require('electron');
const isDev = require('electron-is-dev');


let mainWindow;

function createWindow() {

    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
    });

    const startUrl = isDev ? 'https://localhost:3000' : `file://${path.join(__dirname, '../build/index.html' )}`;

    mainWindow.loadURL(startUrl);

    mainWindow.once('ready-to-show', () => mainWindow.show());
    mainWindow.on('closed', () => mainWindow = null);

}

app.on('ready', createWindow);