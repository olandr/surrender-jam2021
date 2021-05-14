import React, {useState} from 'react';

export const Emoji = (props) => {
    const [size, setSize] = useState('100px');
    const handleClick = () => {
        props.onClick();
        setSize('95px');
        const t = setTimeout(() => {setSize('100px'); clearTimeout(t);}, 100);
        
    }
    return (
        <span
            className="emoji"
            role="img"
            style={{fontSize: size, userSelect: 'none' }}
            onClick={() => handleClick()}
        >
            {props.symbol}
        </span>
    );
};
