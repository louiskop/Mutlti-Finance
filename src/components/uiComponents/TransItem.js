
// internal imports
import React from 'react';

// user imports
import '../../css/uiComponents/TransItem.css';

const TransItem = (props) => {

    return(
        <div className="transItem">
            <h3 id="transItemRef">#{props.trans.reference}</h3>
            <h3>{props.trans.account}</h3>
            <h3>{props.trans.beneficiary}</h3>
            <h3>{props.trans.amount}</h3>
        </div>
    );

};

export default TransItem;