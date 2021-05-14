import React, { useEffect, useState } from 'react';
import {TechTree} from '../tech/Techtree.jsx';
import {GameLoop} from '../game/GameLoop.jsx';
import { Basic } from '../rules/Rules.jsx';

export const Home = () => {
    const [rules, setRules] = useState([]);

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
        <GameLoop rules={rules} />
        {/*<TechTree />*/}
        </>
    );
}
