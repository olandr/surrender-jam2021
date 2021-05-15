import React, { useState, useEffect } from "react";
import { generateTree } from "../utils/tech_tree.js";
import Graph from "react-graph-vis";

export const TechTree = (props) => {
  const [tree, setTree] = useState();
  const [cart, setCart] = useState([]);
  const [overdraft, setOverdraft] = useState(false);
  const [ruleAddition, setRuleAddition] = useState(0);
  useEffect(() => {
    setTree(generateTree());
  }, []);

  useEffect(() => {
    console.log(props.rules);
    let ra = props.rules?.reduce((acc, next) => next.handle(acc), 0);
    console.log(ra);
    setRuleAddition(ra);
  }, [props.rules]);

  // the graph configuration, just override the ones you need
  const options = {
    layout: {
      randomSeed: "Batman2",
    },
    interaction: {
      multiselect: true,
      hover: true,
    },
    nodes: {
      size: 200,
      color: {
        background: "#FF5733",
        border: "#2B42FF",
        highlight: {
          background: "#FFB312",
        },
        hover: {
          background: "#FF0000",
        },
      },
      label: "label",
      font: {
        face: '"Reenie Beanie", cursive',
        size: 20,
      },
    },
    edges: {
      color: "#FFB312",
    },
  };

  const handleNetwork = (network) => {
    network.selectNodes(props.bought);
  };

  const checkout = () => {
    let tc = totalCost(cart);
    if (!overdraft && tc >= 0) {
      let cart_ids = cart.map((e) => (({ id }) => ({ id }))(e)["id"]);
      props.onPayment(cart_ids, tc);
    }
  };

  const totalCost = (vec) => {
    // Discount the already bought techs:
    let already_bought = tree?.nodes
      .filter((n) => props.bought.includes(n.id))
      .reduce((acc, next) => acc + next.cost, 0);
    return (
      vec.reduce((acc, next) => acc + next.cost, 0) -
      already_bought +
      ruleAddition
    );
  };

  const isPurchasable = (id) => {
    // Calculate cost of the newly selected tech
    let c = tree?.nodes.find((n) => n.id === id)?.cost;

    // Calculate total cost
    let tc = totalCost(cart);

    return c + tc <= props.wallet;
  };

  const events = {
    select: (e) => {
      if (isPurchasable(e.nodes[e.nodes.length - 1])) {
        let c = tree?.nodes.filter((n) => e.nodes.includes(n.id));
        setCart(c);
      } else {
        console.log("YOU WILL OVERDRAFT!");
        setOverdraft(true);
      }
    },
  };

  return (
    <>
      {tree && (
        <>
          <button onClick={checkout}>Pay techs</button>
          <button
            onClick={() => {
              setCart([]);
              setOverdraft(false);
            }}
          >
            Clear techs
          </button>
          <Graph
            id="tech-graph"
            graph={tree}
            options={options}
            events={events}
            getNetwork={(net) => handleNetwork(net)}
          />
        </>
      )}
    </>
  );
};
