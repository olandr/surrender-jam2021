import React, { useEffect, useState } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Bar} from '../bar/Bar.jsx';

import {TechTree} from '../tech/Techtree.jsx';
import {GameLoop} from '../game/GameLoop.jsx';
import { loadRules } from '../rules/Rules.jsx';

export const App = () => {
    const [rules, setRules] = useState([]);
    const [hash, setHash] = useState('game');
    const [points, setPoints] = useState(0);
    
    useEffect(() => {
        setRules(loadRules(points, setPoints));
    }, []);

    return (
        <>
            <Bar navigate={(e) => setHash(e)} points={points} />
            {hash==='game' && <GameLoop rules={rules} />}
            {hash==='tree' && <TechTree /> }
        </>
    );

}
