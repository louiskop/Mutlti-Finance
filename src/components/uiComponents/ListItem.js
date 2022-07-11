
// internal imports
import React, {useState, useEffect} from 'react';

// user imports
import '../../css/uiComponents/ListItem.css';
import { saveDataInStorage } from '../../shared/storageFuncs';
import { channels } from "../../shared/constants";
import Button from '../uiComponents/Button';

// electron imports
const { ipcRenderer } = window.require('electron');

const ListItem = (props) => {

    const [account, setAccount] = useState(props.account);
    const [bal, setBal] = useState(props.account.balance);

    const handleChange = (event, data) => {
        setBal(event.target.value);
    }

    const handleSubmit = (event, data) => {
        
        console.log(`handle submit called with ${event}`);

        // change balance and reserve balance
        if(bal > props.account.balance){
            console.log("GEDANE SAKE");
            // validate

            // decrement reserve balance
            props.changeReserve(props.account.balance - bal);

            // update and save account
            account.balance = bal;
            saveDataInStorage(account);
            

        }else if (bal < props.account.balance){
            
            // increment reserve balance(with props)
            props.changeReserve(props.account.balance - bal);

            // update and save account
            account.balance = bal;
            saveDataInStorage(account);

        }

        event.preventDefault();
    }


    //  TODO: is dit bog?
    useEffect(() => {
        ipcRenderer.on(channels.HANDLE_SAVE_DATA, handleNewAccount);
        return () => {
            ipcRenderer.removeListener(channels.HANDLE_SAVE_DATA, handleNewAccount);
        };
    });

    // callback function
    const handleNewAccount = (event, data) => {
        console.log("[+] Data saved success.");
        // setAccount(data.message);
    };


    // handle delete item
    const deleteItem = (event, data) => {

        // increment reserve
        props.changeReserve(bal);
        
        // delete item
        props.deleteItem(account);

    }


    return(
        <div className="ListItem">
            <h3 id="ListItemName">{ account.name }</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" value={bal} onChange={handleChange}id="ListItemBalance"/>
            </form>
            <Button onClick={deleteItem} hoverStyle="redHoverIn" buttonStyle="iconButton" ><i className="fa fa-trash"></i></Button>
        </div>
    );
}

export default ListItem;