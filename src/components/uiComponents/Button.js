
// internal imports
import React, { Component } from 'react';

// user imports
import '../../css/uiComponents/Button.css';


const Button = ({children, onClick, buttonStyle, hoverStyle}) => {

    return(
        <button onClick={onClick} className={`${buttonStyle} ${hoverStyle}`}>
            {children}
        </button>
    );

};

export default Button;