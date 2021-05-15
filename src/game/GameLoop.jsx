import React from "react";

export const GameLoop = (props) => {
  return (
    <>
      {props.rules?.map((e, i) => {
        return e.handle;
      })}
    </>
  );
};
