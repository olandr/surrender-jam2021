import React from "react";
export const Bar = (props) => {
  return (
    <div className={"bar"}>
      <div className={"bar-nav"} onClick={() => props.navigate("game")}>
        Game
      </div>
      <h1>{props.points}p</h1>
      <div className={"bar-nav"} onClick={() => props.navigate("tree")}>
        TechTree
      </div>
    </div>
  );
};
