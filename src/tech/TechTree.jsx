import React, { useState, useEffect } from "react";
import { generateTree } from "../utils/tech_tree.js";
import Graph from "react-graph-vis";

export const TechTree = () => {
  const [tree, setTree] = useState(null);

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
    network.selectNodes([0, 1, 2]);
  };

  return (
    tree && (
      <Graph
        id="tech-graph"
        graph={tree}
        options={options}
        getNetwork={(net) => handleNetwork(net)}
      />
    )
  );
};
