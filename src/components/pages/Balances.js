
// package imports
import React, { useState, useEffect } from 'react';

// user imports
import "../../css/pages/Balances.css";
import { loadSavedData } from "../../shared/storageFuncs";
import { channels } from "../../shared/constants";
import BalanceCard from "../uiComponents/BalanceCard";

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
        ipcRenderer.on(channels.HANDLE_FETCH_DATA, handleReceiveData);
        return () => {
            ipcRenderer.removeListener(channels.HANDLE_FETCH_DATA, handleReceiveData);
        };
    });

    // callback function
    const handleReceiveData = (event, data) => {
        // TODO: error handling
        console.log("[+] Data received.");
        setAccounts([...data.message]);
    };

    
    return (

        <div className="balances">
            <h2>Here displays your balances</h2>
            { accounts.map(account => <BalanceCard account={account} editable={false} />) }
        </div>
        
    );

};

export default Balances;