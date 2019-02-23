import React from 'react';

import './index.css';

// type = add | edit | default
const Button = ({ onClick, disabled, type, children }) => (
    <button onClick={onClick} disabled={disabled} className={`button ${type}`}>
        { children }
    </button>
);

export default Button;
