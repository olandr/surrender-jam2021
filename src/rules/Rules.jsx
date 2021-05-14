import React from 'react';

import { Emoji } from "../utils/assets";

export const loadRules = (points, setPoints) => {
    return [
        {
            id: 0,
            handle: <Basic point_gain={(p) => setPoints(prev => prev+p)}/>,
        }
    ]
}


const Basic = (props) => {
    const handleClick = () => {
        console.log("FIREFIREFIRE!");
        props.point_gain(1);
    }
    return (
        <Emoji symbol='🔥' onClick={handleClick} />
    );
}