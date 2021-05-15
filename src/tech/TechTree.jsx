import React, { useState, useEffect } from "react";
import { generateTree } from "../utils/tech_tree.js";
import Graph from "react-graph-vis";

export const TechTree = (props) => {
  const [tree, setTree] = useState();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setTree(generateTree());
  }, []);

  // the graph configuration, just override the ones you need
  const options = {
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
    // FIXME: calculate the cost of the cart
    let total_cost = 10;
    props.onPayment(cart, total_cost);
  };

  const events = {
    hold: (e) => {
      // FIXME: prevent over-drafting the wallet.
      console.log(e);
      setCart(e.nodes);
    },
  };
  console.log("cool");

  return (
    <>
      {tree && (
        <>
          <button onClick={checkout}>Pay techs</button>
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
