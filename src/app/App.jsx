import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Bar } from "../bar/Bar.jsx";

import { TechTree } from "../tech/TechTree.jsx";
import { GameLoop } from "../game/GameLoop.jsx";
import { loadRules } from "../rules/Rules.jsx";

export const App = () => {
  const [rules, setRules] = useState([]);
  const [hash, setHash] = useState("tree");
  const [points, setPoints] = useState(500);
  // FIXME: get techs from the actual tech tree
  const [techTree, setTechTree] = useState([0]);
  const [bought, setBought] = useState([0]);

  useEffect(() => {
    setRules(loadRules(techTree, points, setPoints));
  }, [techTree]);

  useEffect(() => {
    if (rules.bank) {
      console.log(rules.bank);
      let interested = rules?.bank.reduce(
        (acc, next) => next.handle(acc),
        points
      );
      interested = Math.round(interested);
      if (interested >= 0) {
        setPoints(interested);
      }
    }
  }, [hash]);

  const handlePayment = (t, c) => {
    setPoints((prev) => prev - c);
    setTechTree(t);
    setBought(t);
    setHash("game");
  };

  return (
    <>
      <Bar navigate={(e) => setHash(e)} points={points} />
      <div className="content-wrapper">
        <div>{"🔥".repeat(1 + points / 2)}</div>
        <div className="content">
          {hash === "game" && <GameLoop rules={rules?.present} />}
          {hash === "tree" && (
            <TechTree
              rules={rules?.tech}
              bought={bought}
              wallet={points}
              onPayment={(tree, cost) => handlePayment(tree, cost)}
            />
          )}
        </div>
      </div>
    </>
  );
};
