
// internal imports
import React , { useState, useEffect } from 'react';

// user imports
import "../../css/pages/IncomeExpense.css";
import { channels } from "../../shared/constants";
import { fetchTrans } from '../../shared/storageFuncs';
import TransItem from '../uiComponents/TransItem';

// electron imports
const { ipcRenderer } = window.require('electron');


const IncomeExpense = () => {

    const [trans, setTrans] = useState([]);

    useEffect(() => {
        fetchTrans();
    },[]);

    useEffect(() => {
        ipcRenderer.on(channels.HANDLE_FETCH_TRANS, handleReceiveData);
        return () => {
            ipcRenderer.removeListener(channels.HANDLE_FETCH_TRANS, handleReceiveData);
        };
    });

    const handleReceiveData = (e, data) => {
        setTrans([...data.message]);
    }

    return (

        <div className="incomeexpense">
            
            <div className="incomes">
                <p>Income</p>
            </div>

            <div className="expenses">
                <p>Expenses</p>
            </div>
            
            <div className="transList">
                <p>List of all transactions</p>
                <TransItem trans={{reference: "reference", account: "account", beneficiary: "beneficiary", amount: "amount"}}/>
                { trans.map(tran => <TransItem trans={tran} />) }
            </div>
        
        </div>

    );


}

export default IncomeExpense;