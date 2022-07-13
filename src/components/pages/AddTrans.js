
// internal imports
import React from 'react';

// user imports
import "../../css/pages/AddTrans.css";
import Button from "../uiComponents/Button";


function AddTrans ({trigger, exitPopup}) {

    return trigger ? (

        <div className="addTrans">
            <div className="innerPopup">
                <h2>Here you can add a transaction THIS IS A POPUP</h2>
                <Button onClick={exitPopup} buttonStyle="exitPopup"><i id="exitPop" className="fas fa-times fa-2x"></i></Button>
            </div>
        </div>

    ) : "";

}

export default AddTrans;