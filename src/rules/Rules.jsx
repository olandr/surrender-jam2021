import React from 'react';

import { Emoji } from "../utils/assets";

export const Basic = () => {
    const handleClick = () => {
        console.log("FIREFIREFIRE!");
    }
    return (
        <Emoji symbol='🔥' onClick={handleClick} />
    );
}