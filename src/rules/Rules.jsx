import React from 'react';

import { Emoji } from "../utils/assets";

export const loadRules = (points, setPoints) => {
    const reduced_pg = (cb) => {
        // Apply point_gain effects
        let acc = 1;
        rules_hidden.map((e, i) => {
            acc = e.pg(acc);
        })

        // Update points at parent
        setPoints((prev) => prev+acc);
    }
    const rules_hidden = [
            {
                id: 1,
                pg: (p) => 1.5 * p,
            },
            {
                id: 2,
                pg: (p) => 0.5 * p,
            },
            {
                id: 6,
                pg: (p) => p +1,
            },
            {
                id: 7,
                pg: (p) => p + 2,
            },
        ]

    const rules_present = [
        {
            id: 0,
            handle: <Basic point_gain={reduced_pg}/>,
        }
    ];
    return rules_present;
}


const Basic = (props) => {
    const handleClick = () => {
        console.log("FIREFIREFIRE!");
        props.point_gain();
    }
    return (
        <Emoji symbol='🔥' onClick={handleClick} />
    );
}
