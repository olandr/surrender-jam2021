import React, { useEffect, useState } from "react";

const simbutton_click = (cb) => {
  cb(0.95);
  const t = setTimeout(() => {
    cb(1.0);
    clearTimeout(t);
  }, 100);
};

export const Emoji = (props) => {
  const [size, setSize] = useState("100px");
  const handleClick = () => {
    props.onClick();
    simbutton_click((e) => setSize(100 * e + "px"));
  };
  return (
    <span
      className="emoji"
      role="img"
      style={{ fontSize: size, userSelect: "none" }}
      onClick={() => handleClick()}
    >
      {props.symbol}
    </span>
  );
};

export const NumPad = (props) => {
  const [val, setVal] = useState("");
  const emergency = ["112", "911"];
  useEffect(() => {
    if (emergency.includes(val)) {
      props.onFinish(1);
    }
    console.log(val);
  }, [val]);
  const handleClick = (e) => {
    e.stopPropagation();
    setVal((prev) => prev + e.target.innerText);
  };

  return (
    <table className="num-pad">
      <thead />
      <tbody>
        <tr>
          <td>
            <button onClick={(e) => handleClick(e)}>7</button>
          </td>
          <td>
            <button onClick={(e) => handleClick(e)}>8</button>
          </td>
          <td>
            <button onClick={(e) => handleClick(e)}>9</button>
          </td>
        </tr>
        <tr>
          <td>
            <button onClick={(e) => handleClick(e)}>4</button>
          </td>
          <td>
            <button onClick={(e) => handleClick(e)}>5</button>
          </td>
          <td>
            <button onClick={(e) => handleClick(e)}>6</button>
          </td>
        </tr>
        <tr>
          <td>
            <button onClick={(e) => handleClick(e)}>1</button>
          </td>
          <td>
            <button onClick={(e) => handleClick(e)}>2</button>
          </td>
          <td>
            <button onClick={(e) => handleClick(e)}>3</button>
          </td>
        </tr>
        <tr>
          <td />
          <td>
            <button onClick={(e) => handleClick(e)}>0</button>
          </td>
          <td />
        </tr>
      </tbody>
    </table>
  );
};
