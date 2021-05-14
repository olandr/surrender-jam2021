import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Home} from '../home/Home.jsx';

export const App = () => {
    return (
        <Router>
            <Switch>
                <Route path='/'>
                    <Home />
                </Route>
            </Switch>
        </Router>
    )
}
