import React, { useState, useEffect } from 'react';
import { Graph } from "react-d3-graph";
import { generateTree } from '../utils/tech_tree.js';

export const TechTree = () => {
    const [tree, setTree] = useState(null);

    // the graph configuration, just override the ones you need
    const myConfig = {
        nodeHighlightBehavior: true,
        node: {
        color: "lightgreen",
        size: 120,
        highlightStrokeColor: "blue",
        },
        link: {
        highlightColor: "lightblue",
        },
    };
    
    const onClickNode = function(nodeId) {
        window.alert(`Clicked node ${nodeId}`);
    };
    
    const onClickLink = function(source, target) {
        window.alert(`Clicked link between ${source} and ${target}`);
    };
  
    useEffect(() => {
        setTree(generateTree());
    }, []);
    
    return (
        tree && <Graph
            id="graph-id" // id is mandatory
            data={tree}
            config={myConfig}
            onClickNode={onClickNode}
            onClickLink={onClickLink}
        />
    )
}
