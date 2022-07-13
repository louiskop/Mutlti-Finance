
// internal imports
import React, { useEffect, useState } from 'react';

// user imports
import "../../css/pages/AddTrans.css";
import Button from "../uiComponents/Button";
import { channels } from "../../shared/constants";
import { loadSavedData, saveTrans } from "../../shared/storageFuncs";

// electron imports
const { ipcRenderer } = window.require('electron');

function AddTrans ({trigger, exitPopup}) {

    const [accounts, setAccounts] = useState([]);

    // TODO: validation
    //  check that at least one acc exists before adding trans
    //  check that expense can be paid!

    // load accounts
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
        console.log(accounts);
    };

    const submitTrans = (e, data) => {

        e.preventDefault('');

        let trans = {
            reference: "huisdans",
            type: "income",
            amount: 50,
            beneficiary: "Huis Visser",
            account: "Kuier"
        };


        addTrans(trans);
        
        

    }

    // add transaction
    const addTrans = (trans) => {
        saveTrans(trans)
    }

    useEffect(() => {
        ipcRenderer.on(channels.HANDLE_SAVE_DATA, saveTransComplete);
        return () => {
            ipcRenderer.removeListener(channels.HANDLE_SAVE_DATA, saveTransComplete);
        };
    });

    const saveTransComplete = () => {
        exitPopup();
    }

    return trigger ? (

        <div className="addTrans">
            <div className="innerPopup">
                <h2>Add a transaction</h2>

                <form>
                    <p>Type</p>
                    <select name="type">
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
                    </select>

                    <p>Amount</p>
                    <input type="number" name="amount" placeholder="0.00"/>

                    <p>Account</p>
                    <select name="account">
                        { accounts.map(account => <option value={account.name}>{account.name}</option>) }
                    </select>

                    <p>Beneficiary</p>
                    <input type="text" name="beneficiary" placeholder="John Doe"/>
                    // TODO: saved beneficiaries list and icon to save current, (COMBO BOX???)


                    <p>Reference</p>
                    <input type="text" name="reference" placeholder="august_drug_money"/>

                    <Button onClick={submitTrans} buttonStyle="floatAct" hoverStyle="whiteHover"><i class="fa fa-check fa-2x"></i></Button>
                </form>

                <Button onClick={exitPopup} buttonStyle="exitPopup"><i id="exitPop" className="fas fa-times fa-2x"></i></Button>
            </div>
        </div>

    ) : "";

}

export default AddTrans;