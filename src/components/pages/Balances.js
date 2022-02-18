
// package imports
import React, { useState, useEffect } from 'react';

// user imports
import "../../css/pages/Balances.css";
import { loadSavedData } from "../../shared/storageFuncs";
import { HANDLE_FETCH_DATA } from "../../shared/constants";

// electron imports
const { ipcRenderer } = window.require('electron');

const Balances = () => {

    const [accounts, setAccounts] = useState([]);
    

    // get saved data
    useEffect(() => {
        loadSavedData();
    },[]);

    // listen for handler for fetch
    useEffect(() => {
        ipcRenderer.on(HANDLE_FETCH_DATA, handleReceiveData);
        return () => {
            ipcRenderer.removeListener(HANDLE_FETCH_DATA, handleReceiveData);
        };
    });

    // callback function
    const handleReceiveData = (event, data) => {
        console.log("[+] Data received on React!!!");
        // setAccounts([...data.message]]);
    };

    
    return (

        <div className="balances">
            <h2>Here displays your balances</h2>
        </div>
        
    );

};

export default Balances;