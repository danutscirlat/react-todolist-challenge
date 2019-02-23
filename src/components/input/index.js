import React from 'react';

import './index.css';

const Input = ({ name, value, disabled = '', placeholder, className, onChange, onKeyPress }) => (
    <input
        type='text'
        name={name}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        className={className}
        onChange={event => onChange(event.target.value)}
        onKeyPress={event => onKeyPress(event)}
    />
);

export default Input;
