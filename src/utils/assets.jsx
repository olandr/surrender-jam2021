import React from 'react';

export const Emoji = (props) => (
    <span
        className="emoji"
        role="img"
        style={{fontSize:'100px', userSelect: 'none' }}
        onClick={props.onClick}
    >
        {props.symbol}
    </span>
);
