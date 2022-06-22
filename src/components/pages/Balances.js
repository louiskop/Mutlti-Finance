
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
    const [totalBalance, setTotalBalance] = useState(0);

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

    // get total balance
    useEffect(() => {
        let computedBalance = 0;
        accounts.forEach(acc => {
            computedBalance += acc.balance;
        });
        setTotalBalance(computedBalance);
    }, [accounts])

    
    return (

        <div className="balances">
            <div className="totBal">
                <h2>R { totalBalance }</h2>
            </div>
            <div className="cards">
                { accounts.map(account => <BalanceCard account={account} editable={false} />) }
            </div>
        </div>
        
    );

};

export default Balances;