import React from 'react';
import data from '../../data/techs';

import { Emoji } from "../utils/assets";

export const loadRules = (points, setPoints) => {
    const reduced_pg = (cb) => {
        // Apply point_gain effects
        let acc = 1;
        console.log(rules_hidden);
        rules_hidden.map((e, i) => {
            acc = eval(e.hidden_pg)(acc);
        })

        // Update points at parent
        setPoints((prev) => prev+acc);
    }
    // FIXME: get techs from the actual tech tree
    const chosen_techs = (e) => {
        const filter = [14];
        return e.hidden_pg && !filter.includes(e.id) && true;
    }
    const rules_hidden = data?.nodes.filter(e => chosen_techs(e)).map(e => (({id, hidden_pg}) => ({id, hidden_pg}))(e))
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
