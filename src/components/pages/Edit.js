
// internal imports
import React, { useState, useEffect } from 'react';

// user imports
import "../../css/pages/Edit.css";
import { saveDataInStorage } from "../../shared/storageFuncs";
import { channels } from "../../shared/constants";

// electron imports
const { ipcRenderer } = window.require('electron');

const Edit = () => {

    const [accounts, setAccounts] = useState([]);


    // save account
    const addAccount = (account) => {
        console.log("[+] React called addAccount() which will call saveDatainStorage()");
        saveDataInStorage(account);
    };

    // listen for handler for save
    useEffect(() => {
        ipcRenderer.on(channels.HANDLE_SAVE_DATA, handleNewAccount);
        return () => {
            ipcRenderer.removeListener(channels.HANDLE_SAVE_DATA, handleNewAccount);
        };
    });

    // callback function
    const handleNewAccount = (event, data) => {
        console.log("[+] React received new Item:", data.message);
        setAccounts([...accounts, data.message]);  
    };

    return (

        <div className="edit">
            <h2>Edit your accounts heres</h2>
            <button >Add your new account</button>
            <input></input>
        </div>

    );

};

export default Edit;