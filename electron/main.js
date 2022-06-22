
// package imports
const { app, BrowserWindow} = require('electron');
const isDev = require('electron-is-dev');
const { ipcMain } = require('electron/main');
const { channels } = require('../src/shared/constants');
const storage = require('electron-json-storage');

// variables
let mainWindow;
let accountsToTrack;
let overWrite = false;

console.log("\nINFORMATION: \n --Storage:" + app.getPath('userData') + "\n");

function createWindow() {

    mainWindow = new BrowserWindow({
        fullscreen: true,
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

    console.log(`[+] Fetching data from storage with key ${message} ...`);

    // fetch data from storage
    storage.get(message, (error, data) => {

        accountsToTrack = JSON.stringify(data) === '{}' ? [] : data;

        if(error){

            mainWindow.send(channels.HANDLE_FETCH_DATA, {
                success: false,
                message: "accountsToTrack not returned"
            });

        }else {

            mainWindow.send(channels.HANDLE_FETCH_DATA, {
                success: true,
                message: accountsToTrack,
            });

        }
    });

});

ipcMain.on(channels.SAVE_DATA_IN_STORAGE, (event, message) => {

    console.log(`[+] Saving data ${message.name} in storage ...`);

    // check if data exists to overwrite
    accountsToTrack.map(account => {
        if(account.name == message.name){
            overWrite = true;
            accountsToTrack[accountsToTrack.indexOf(account)] = message;
        }
    })

    // add new data to accountsToTrack
    if(!overWrite){
        accountsToTrack.push(message);
    }

    overWrite = false;

    // save in storage
    storage.set('accounts', accountsToTrack, (error) =>{

        if(error){

            mainWindow.send(channels.HANDLE_SAVE_DATA, {
                success: false,
                message: "Could not save the new data"
            });

        }else {

            mainWindow.send(channels.HANDLE_SAVE_DATA, {
                success: true,
                message: accountsToTrack
            });

        }

    });

    mainWindow.send(channels.HANDLE_SAVE_DATA, {
        success: true,
        message: message,
    });

});

