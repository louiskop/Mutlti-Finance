
// internal imports
import React, { useState, useEffect } from 'react';

// user imports
import "../../css/pages/Edit.css";
import { saveDataInStorage } from "../../shared/storageFuncs";
import { channels } from "../../shared/constants";
import { loadSavedData } from "../../shared/storageFuncs";
import { deleteDataInStorage } from '../../shared/storageFuncs';
import ListItem from "../uiComponents/ListItem";

// electron imports
const { ipcRenderer } = window.require('electron');

const Edit = () => {

    const [accounts, setAccounts] = useState([]);
    const [nameVal, setNameVal] = useState('');
    const [reserve, setReserve] = useState(0);
    let duplicate = false;

    // load data

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
        setAccounts([...data.message]);
    };

    // add new data

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

        // prevent duplicate rendering based balance edit
        accounts.map(account => {
            if (account.name == data.message.name){
                duplicate = true;
            }
        });

        if(!duplicate){
            setAccounts([...accounts, data.message]);  
        }

        duplicate = false;

    };

    // handle input form change
    const handleChange = (event, data) => {
        setNameVal(event.target.value);  
    }

    // form submit
    const handleSubmit = (event, data) => {

        // TODO: validation (samename)

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

    // change reserve amount
    const changeReserve = (amount) => {
        let newAmount = parseInt(reserve) + parseInt(amount);
        setReserve(newAmount);
    }

    // delete a item
    const deleteItem = (acc) => {

        // find & delete item locally
        accounts.map((account) => {
            if(account.name == acc.name){
                let newAcc = accounts;
                newAcc.splice(accounts.indexOf(account),1)
                setAccounts(newAcc);
            }
        });

        // delete item in storage
        deleteDataInStorage(acc);

    }

    return (

        <div className="edit">
            <div className="reserveDiv">
                <h1>Reserve - R {reserve}</h1>
            </div>
            <form className="addAcc" onSubmit={handleSubmit}>
                <input type="text" placeholder="Add a new account" value={nameVal} onChange={handleChange}/>
                <input type="submit" value="Add your account"/>
            </form>
            <div className="accountListDiv">
                { accounts.map(account => <ListItem key={account.name} changeReserve={changeReserve} deleteItem={deleteItem} account={account}/>) }
            </div>


        </div>

    );

};

export default Edit;


// TODO: disable add transaction button