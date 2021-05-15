import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Bar } from "../bar/Bar.jsx";

import { TechTree } from "../tech/TechTree.jsx";
import { GameLoop } from "../game/GameLoop.jsx";
import { loadRules } from "../rules/Rules.jsx";

export const App = () => {
  const [rules, setRules] = useState([]);
  const [hash, setHash] = useState("tree");
  const [points, setPoints] = useState(1000);
  // FIXME: get techs from the actual tech tree
  const [techTree, setTechTree] = useState([0]);
  const [bought, setBought] = useState([0]);

  useEffect(() => {
    setRules(loadRules(techTree, points, setPoints));
  }, [techTree]);

  const handlePayment = (t, c) => {
    setPoints((prev) => prev - c);
    setTechTree(t);
    setBought(t);
    setHash("game");
  };

  return (
    <>
      <Bar navigate={(e) => setHash(e)} points={points} />
      <div className="content">
        {hash === "game" && <GameLoop rules={rules} />}
        {hash === "tree" && (
          <TechTree
            bought={bought}
            wallet={points}
            onPayment={(tree, cost) => handlePayment(tree, cost)}
          />
        )}
      </div>
    </>
  );
};
