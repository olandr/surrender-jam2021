import React, { useEffect, useState } from "react";
import data from "../../data/techs";

import { Emoji, NumPad } from "../utils/assets";

export const loadRules = (techTree, points, setPoints) => {
  let rawAcc = 0;

  const setRawAcc = (e) => {
    rawAcc += parseInt(e);
  };

  const reduced_pg = (cb) => {
    // Apply point_gain effects
    let acc = 1;
    console.log(rules_hidden);
    rules_hidden.map((e, i) => {
      acc = eval(e.hidden_pg)(acc);
    });

    // Add presentable pg modifiers
    acc += parseInt(rawAcc);
    // Update points at parent
    setPoints((prev) => prev + acc);
  };
  const chosen_techs = (e) => {
    return techTree.includes(e.id) && true;
  };

  const hidden_techs = (e) => {
    return e.hidden_pg && chosen_techs(e);
  };

  const rules_hidden = data?.nodes
    .filter((e) => hidden_techs(e))
    .map((e) => (({ id, hidden_pg }) => ({ id, hidden_pg }))(e));
  const rules_present = [
    {
      id: 0,
      handle: <Basic point_gain={reduced_pg} />,
    },
    {
      id: 8,
      handle: <NumPad onFinish={(e) => setRawAcc(e)} />,
    },
    {
      id: 11,
      handle: (
        <TextInput match={"dinodinodino"} onFinish={(e) => setRawAcc(e)} />
      ),
    },
    {
      id: 15,
      handle: <NumInput onFinish={(e) => setRawAcc(e)} />,
    },
  ].filter((e) => chosen_techs(e));

  return rules_present;
};

const Basic = (props) => {
  const handleClick = () => {
    console.log("FIREFIREFIRE!");
    props.point_gain();
  };
  return <Emoji symbol="🔥" onClick={handleClick} />;
};

const NumInput = (props) => {
  const [val, setVal] = useState("");

  const handleChange = (e) => {
    if (e.length <= 2) {
      setVal(e);
    } else if (e.length == 3) {
      props.onFinish(val);
    }
  };
  return <input onChange={(e) => handleChange(e.target.value)} />;
};

const TextInput = (props) => {
  const [val, setVal] = useState("");
  useEffect(() => {
    if (val === props.match) {
      props.onFinish(1);
    }
  }, [val]);

  return <input onChange={(e) => setVal(e.target.value)} />;
};
