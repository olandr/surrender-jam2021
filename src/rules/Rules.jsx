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
      id: 9,
      handle: <KeyListener match={["KeyQ"]} onFinish={(e) => setRawAcc(e)} />,
    },
    {
      id: 10,
      handle: <KeyListener match={["KeyW"]} onFinish={(e) => setRawAcc(e)} />,
    },
    {
      id: 11,
      handle: (
        <TextInput match={"dinodinodino"} onFinish={(e) => setRawAcc(e)} />
      ),
    },
    {
      id: 12,
      handle: (
        <KeyListener
          match={[
            "ArrowUp",
            "ArrowUp",
            "ArrowDown",
            "ArrowDown",
            "ArrowLeft",
            "ArrowRight",
            "ArrowLeft",
            "ArrowRight",
          ]}
          onFinish={(e) => setRawAcc(e)}
        />
      ),
    },
    {
      id: 13,
      handle: (
        <TextInput
          match={"something super quick"}
          onFinish={(e) => setRawAcc(e)}
        />
      ),
    },
    {
      id: 15,
      handle: <NumInput onFinish={(e) => setRawAcc(e)} />,
    },
    {
      id: 24,
      handle: <Trash onClick={() => setPoints(0)} />,
    },
    {
      id: 25,
      handle: <Fountain onClick={() => setPoints((prev) => prev - 1)} />,
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

const Trash = (props) => {
  return <Emoji symbol="🚒" onClick={props.onClick} />;
};

const Fountain = (props) => {
  return <Emoji symbol="🧯" onClick={props.onClick} />;
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

const KeyListener = (props) => {
  const [correct, setCorrect] = useState(0);
  useEffect(() => {
    console.log(props.match);
    if (correct === props.match.length) {
      console.log("done!");
      props.onFinish(props.match.length);
    }
  }, [correct]);

  document.onkeydown = (e) => {
    let ev = e || window.event;
    if (ev.code === props.match[correct]) {
      setCorrect((prev) => prev + 1);
    } else {
      setCorrect(0);
    }
  };
  return null;
};
