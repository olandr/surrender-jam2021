import React, { useState, useEffect } from "react";
import { Graph } from "react-d3-graph";
import { generateTree } from "../utils/tech_tree.js";

export const TechTree = () => {
  const [tree, setTree] = useState(null);

  // the graph configuration, just override the ones you need
  const myConfig = {
    nodeHighlightBehavior: true,
    width: 1900,
    height: 950,
    directed: true,
    node: {
      color: "#FF5733",
      size: 200,
      highlightStrokeColor: "#FD2D00",
      labelProperty: "name",
    },
    link: {
      color: "#FFB312",
      highlightColor: "#FFBE33",
    },
  };

  const onClickNode = function (nodeId) {
    window.alert(`Clicked node ${nodeId}`);
  };

  const onClickLink = function (source, target) {
    window.alert(`Clicked link between ${source} and ${target}`);
  };

  const onToolTip = (nodeID, node) => {
    console.log(node["_indesc"]);
  };

  useEffect(() => {
    setTree(generateTree());
  }, []);

  return (
    tree && (
      <Graph
        id="graph-id" // id is mandatory
        data={tree}
        config={myConfig}
        onClickNode={onClickNode}
        onClickLink={onClickLink}
        onMouseOverNode={onToolTip}
      />
    )
  );
};
