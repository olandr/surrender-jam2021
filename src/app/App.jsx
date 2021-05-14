import React, { useEffect, useState } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Bar} from '../bar/Bar.jsx';

import {TechTree} from '../tech/Techtree.jsx';
import {GameLoop} from '../game/GameLoop.jsx';
import { Basic } from '../rules/Rules.jsx';

export const App = () => {
    const [rules, setRules] = useState([]);
    const [hash, setHash] = useState('game');
    useEffect(() => {
        //setRules(loadRules());
        setRules([
            {
                handle: <Basic />
            }
        ])
    }, []);

    return (
        <>
            <Bar navigate={(e) => setHash(e)} />
            {hash==='game' && <GameLoop rules={rules} />}
            {hash==='tree' && <TechTree /> }
        </>
    );

}
