
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
    const [nameVal, setNameVal] = useState('');

    // save account
    const addAccount = (account) => {
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
        console.log("[+] Data saved success.");
        setAccounts([...accounts, data.message]);  
    };

    // handle input form change
    const handleChange = (event, data) => {
        setNameVal(event.target.value);  
    }

    // form submit
    const handleSubmit = (event, data) => {
        console.log(`HANDLESUBMIT : ${nameVal}`);
        addAccount({
            name: nameVal,
            balance: 400,
            goalBalance: 600,
            percentIncome: 20,
            priority: true,
            record: 0,
        });
        event.preventDefault();
        setNameVal('');
    }

    return (

        <div className="edit">
            <h2>Edit your accounts heres</h2>
            <form onSubmit={handleSubmit}>
            <input type="text" value={nameVal} onChange={handleChange}/>
            <input type="submit" value="Add your account"/>
            </form>
        </div>

    );

};

export default Edit;