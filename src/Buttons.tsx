import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faS,
  faBackspace
} from "@fortawesome/free-solid-svg-icons";

library.add(faS, faBackspace);

const Buttons = (props: any) => {
  return (
    <div className="container">
      <button
        id="clear"
        onClick={props.initialize}
        style={{ backgroundColor: "#b55" }}
      >
        AC
      </button>
      <button
        id="divide"
        style={{ background: "#578" }}
        onClick={props.updateDisplay}
        value="/"
      >
        /
      </button>
      <button
        id="multiply"
        style={{ background: "#578" }}
        onClick={props.updateDisplay}
        value="*"
      >
        x
      </button>
      <button id="erase" style={{ background: "#578" }} onClick={props.erase}>
         <FontAwesomeIcon icon={faBackspace} />
      </button>
      <button id="seven" onClick={props.updateDisplay} value="7">
        7
      </button>
      <button id="eight" onClick={props.updateDisplay} value="8">
        8
      </button>
      <button id="nine" onClick={props.updateDisplay} value="9">
        9
      </button>
      <button
        id="subtract"
        style={{ background: "#578" }}
        onClick={props.updateDisplay}
        value="-"
      >
        -
      </button>
      <button id="four" onClick={props.updateDisplay} value="4">
        4
      </button>
      <button id="five" onClick={props.updateDisplay} value="5">
        5
      </button>
      <button id="six" onClick={props.updateDisplay} value="6">
        6
      </button>
      <button
        id="add"
        style={{ background: "#578" }}
        onClick={props.updateDisplay}
        value="+"
      >
        +
      </button>
      <button id="one" onClick={props.updateDisplay} value="1">
        1
      </button>
      <button id="two" onClick={props.updateDisplay} value="2">
        2
      </button>
      <button id="three" onClick={props.updateDisplay} value="3">
        3
      </button>
      <button
        id="equals"
        style={{ height: 141, background: "#79a" }}
        onClick={props.equale}
        value="="
      >
        =
      </button>
      <button
        id="plusMinus"
        style={{ marginTop: -71, background: "#578" }}
        onClick={props.plusMinus}
        value="±"
      >
        ±
      </button>
      <button
        id="zero"
        style={{ marginTop: -71 }}
        onClick={props.updateDisplay}
        value="0"
      >
        0
      </button>
      <button
        id="decimal"
        style={{ marginTop: -71 }}
        onClick={props.decimal}
        value="."
      >
        .
      </button>
    </div>
  );
};

export default Buttons;