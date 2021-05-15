import React, { useState, useEffect } from "react";
import { generateTree } from "../utils/tech_tree.js";
import Graph from "react-graph-vis";

export const TechTree = () => {
  const [tree, setTree] = useState(null);
  // the graph configuration, just override the ones you need
  const options = {
    nodes: {
      color: "#FF5733",
      size: 200,
      //highlightStrokeColor: "#FD2D00",
      label: "label",
    },
    edges: {
      color: "#FFB312",
    },
  };
  const events = {
    select: (event) => {
      let { nodes, edges } = event;
      window.alert(`Clicked node ${nodes[0]}`);
      nodes[0] && console.log(nodes[0]["title"]);
    },
  };

  useEffect(() => {
    setTree(generateTree());
  }, []);

  return (
    tree && (
      <Graph
        id="graph-id" // id is mandatory
        graph={tree}
        options={options}
      />
    )
  );
};
