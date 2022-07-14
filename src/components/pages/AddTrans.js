
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

    // form variables
    const [type, setType] = useState("Income");
    const [amount, setAmount] = useState();
    const [account, setAccount] = useState("");
    const [benefic, setBenefic] = useState("");
    const [ref, setRef] = useState("");

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
        setAccount(accounts[0].name);
    };

    const submitTrans = (e, data) => {

        e.preventDefault('');

        let trans = {
            reference: ref,
            type: type,
            amount: parseInt(amount),
            beneficiary: benefic,
            account: account
        };

        // TODO: check redundancy if popup is closed in any case
        // clear form
        setType("Income");
        setAmount(0);
        setBenefic("");
        setAccount(accounts[0].name);
        setRef("");

        addTrans(trans);

    }

    // add transaction
    const addTrans = (trans) => {
        saveTrans(trans)
    }

    useEffect(() => {
        ipcRenderer.on(channels.HANDLE_SAVE_TRANS, saveTransComplete);
        return () => {
            ipcRenderer.removeListener(channels.HANDLE_SAVE_TRANS, saveTransComplete);
        };
    });

    const saveTransComplete = () => {
        exitPopup();
    }

    // form value handlers
    const typeChange = (e) => {
        setType(e.target.value);
    }

    const amountChange = (e) => {
        setAmount(e.target.value);
    }

    const accountChange = (e) => {
        setAccount(e.target.value);
    }

    const beneficChange = (e) => {
        setBenefic(e.target.value);
    }

    const refChange = (e) => {
        setRef(e.target.value);
    }

    return trigger ? (

        <div className="addTrans">
            <div className="innerPopup">
                <h1>Add a transaction</h1>

                <form>

                    <div>
                    <p>Type</p>
                    <select value={type} onChange={typeChange} name="type">
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
                    </select>
                    </div>

                    <div>
                    <p>Amount</p>
                    <input value={amount} onChange={amountChange} type="number" name="amount" placeholder="0.00"/>
                    </div>

                    <div>
                    <p>Account</p>
                    <select value={account} onChange={accountChange} name="account">
                        { accounts.map(account => <option value={account.name}>{account.name}</option>) }
                    </select>
                    </div>

                    <div>
                    <p>Beneficiary</p>
                    <input value={benefic} onChange={beneficChange} type="text" name="beneficiary" placeholder="John Doe"/>
                    // TODO: saved beneficiaries list and icon to save current, (COMBO BOX???)
                    </div>

                    <div>
                    <p>Reference</p>
                    <input value={ref} onChange={refChange} type="text" name="reference" placeholder="august_drug_money"/>
                    </div>

                    <Button onClick={submitTrans} buttonStyle="floatAct" hoverStyle="whiteHover"><i class="fa fa-check fa-2x"></i></Button>
                </form>

                <Button onClick={exitPopup} buttonStyle="exitPopup"><i id="exitPop" className="fas fa-times fa-2x"></i></Button>
            </div>
        </div>

    ) : "";

}

export default AddTrans;