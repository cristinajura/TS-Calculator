import React, { useState } from 'react';
import Buttons from './Buttons';
import { OutputDisplay, InputDisplay } from './DisplayComponents';
import './App.scss';

const isOperator = /[*/+-]/;
const isNumber = /\d/g;
const endsWithOperator = /[*/+-]$/;
const startWithMinus = /^-\d+/;

const Calculator = () => {
      const [outputDisplay, setOutputDisplay] = useState("");
      const [inputDisplay, setInputDisplay] = useState("0");

  const digitLimitWarning = (e: any) => {
    let value = e.target.value;
    if(isOperator.test(value)) {
      setInputDisplay(value);
      setOutputDisplay(outputDisplay + value);
    } else {
      setInputDisplay("Digit Limit Met");
      setTimeout(() => setInputDisplay(inputDisplay), 1000);
    }
  }

  const updateInputDisplay = (e: any) => {
    let value = e.target.value;
    const firstParenthesis = outputDisplay.split("").filter((x) => x === "(")
      .length;
    const secondParenthesis = outputDisplay.split("").filter((x) => x === ")")
      .length;

    if (inputDisplay.length > 20) {
      digitLimitWarning(e);
    } else if (outputDisplay.includes("=") && isOperator.test(value)) {
      if (startWithMinus.test(inputDisplay)) {
        setInputDisplay(value);
        setOutputDisplay("(" + inputDisplay + ")" + value);
      } else {
        setInputDisplay(value);
        setOutputDisplay(inputDisplay + value);
      }
    } else if (outputDisplay.includes("=") && !isOperator.test(value)) {
        setInputDisplay(value);
        setOutputDisplay(value);
    } else if (!inputDisplay.includes("Limit")) {
      if (outputDisplay === "" && isOperator.test(value)) {         
          setInputDisplay("0");
          setOutputDisplay("");
      } else if (inputDisplay === "-0" && outputDisplay.slice(-3) === "(-0") {
          setInputDisplay(inputDisplay.slice(0, -1) + value);
          setOutputDisplay(outputDisplay.slice(0, -1) + value);
      } else if (
        inputDisplay === "-" &&
        outputDisplay.slice(-2) === "(-" &&
        !value.match(isNumber)
      ) {
          setInputDisplay(inputDisplay);
          setOutputDisplay(outputDisplay);
      } else if (outputDisplay.slice(-1) === ")" && value.match(isNumber)) {
          setInputDisplay(inputDisplay);
          setOutputDisplay(outputDisplay);
      } else if (
        inputDisplay.match(isNumber) &&
        inputDisplay !== "0" &&
        value.match(isNumber)
      ) {
          setInputDisplay(inputDisplay + value);
          setOutputDisplay(outputDisplay + value);
      } else if (inputDisplay === "0" && outputDisplay === "") {
          setInputDisplay(value.slice(0));
          setOutputDisplay(value);
      } else if (inputDisplay === "0" && outputDisplay === "0") {
        if (value.match(isOperator)) {
          setInputDisplay(value);
          setOutputDisplay(outputDisplay + value);
        } else {
          setInputDisplay(value);
          setOutputDisplay(value);
        }
      } else if (inputDisplay === "0" && !value.match(isOperator)) {
          setInputDisplay(value);
          setOutputDisplay(outputDisplay.slice(0, -1) + value);
      } else if (outputDisplay.slice(-2) === "(-" && inputDisplay === "-") {
          setInputDisplay(inputDisplay + value);
          setOutputDisplay(outputDisplay + value);
      } else if (
        value.match(isOperator) &&
        firstParenthesis !== secondParenthesis
      ) {
          setInputDisplay(value);
          setOutputDisplay(outputDisplay + ")"  + value);
      } else if (
        (endsWithOperator.test(outputDisplay) &&
        value.match(isOperator)) || (outputDisplay.slice(-1) === "." && value.match(isOperator))
      ) {
          setInputDisplay(value);
          setOutputDisplay(outputDisplay.slice(0, -1) + value);
      } else if (value.match(isOperator) || inputDisplay.match(isOperator)) {
          setInputDisplay(value);
          setOutputDisplay(outputDisplay + value);
      } else {
          setInputDisplay(inputDisplay + value);
          setOutputDisplay(outputDisplay + value);
      }
    }
  }

  const handleResult = () => {
    const firstParenthesis: number = outputDisplay
      .split("")
      .filter((x) => x === "(").length;
    const secondParenthesis: number = outputDisplay
      .split("")
      .filter((x) => x === ")").length;
    if (
      (inputDisplay.length === 1 &&
        inputDisplay.match(isOperator)) ||
      (inputDisplay === "" &&
        outputDisplay.slice(-1).match(isOperator))
    ) {
      if (outputDisplay.slice(-2) === "(-") {
        let cutLastSign = outputDisplay.slice(0, -3);
        const result: any = Math.round(1000000000 * eval(cutLastSign)) / 1000000000;
          setInputDisplay(result);
          setOutputDisplay(cutLastSign + "=");
      } else {
        let cutLastSign = outputDisplay.slice(0, -1);
        const result: any = Math.round(1000000000 * eval(cutLastSign)) / 1000000000;
          setInputDisplay(result);
          setOutputDisplay(cutLastSign + "=");
      }
    } else if (
      outputDisplay.slice(
        outputDisplay.length - (inputDisplay.length + 1),
        -inputDisplay.length
      ) === "("
    ) {
      const addParenthesis = outputDisplay + ")";
      const result: any = Math.round(1000000000 * eval(addParenthesis)) / 1000000000;
         setInputDisplay(result);
         setOutputDisplay(addParenthesis + "=");
    } else if (firstParenthesis !== secondParenthesis) {
      const addParenthesis = outputDisplay + ")";
      const result: any = Math.round(1000000000 * eval(addParenthesis)) / 1000000000;
         setInputDisplay(result);
         setOutputDisplay(addParenthesis + "=");
    } else if (
      inputDisplay === "-" &&
      outputDisplay ==="(-"
    ) {
        setInputDisplay(inputDisplay);
        setOutputDisplay(outputDisplay);
    } else {
      const result: any = Math.round(1000000000 * eval(outputDisplay)) / 1000000000;
        setInputDisplay(result);
        setOutputDisplay(outputDisplay + "=");
    }
  }

  const handleDecimal = () => {
    if (outputDisplay.includes("=") || outputDisplay === "") {
       setInputDisplay("0.");
       setOutputDisplay("0.");    
    } else if (inputDisplay.match(isOperator) && inputDisplay.length === 1) {
       setInputDisplay("0.");
       setOutputDisplay(outputDisplay + "0.");
    } else if (outputDisplay.slice(-1) === ")") {
       setInputDisplay(inputDisplay);
       setOutputDisplay(outputDisplay);
    } else if (!inputDisplay.includes(".")) {
       setInputDisplay(inputDisplay + ".");
       setOutputDisplay(outputDisplay + ".");
    }
  }

  const handlePlusMinus = () => {
    if (
      (inputDisplay === "0" && outputDisplay === "") ||
      (inputDisplay === "" && outputDisplay === "")
    ) {
        setInputDisplay("-");
        setOutputDisplay("(-");
    } else if (
      inputDisplay === "" &&
      outputDisplay.slice(-1).match(isOperator)
    ) {
        setInputDisplay("-");
        setOutputDisplay(outputDisplay + "(-");
    } else if (inputDisplay === "-" && outputDisplay === "(-") {
        setInputDisplay("0");
        setOutputDisplay("");
    } else if (outputDisplay.includes("=")) {
      if (startWithMinus.test(inputDisplay)) {
        setInputDisplay(inputDisplay.toString().slice(1));
        setOutputDisplay(inputDisplay.toString().slice(1));
      } else {
        setInputDisplay("-" + inputDisplay);
        setOutputDisplay("(-" + inputDisplay);
      }
    } else if (inputDisplay.match(isNumber)) {
      if (startWithMinus.test(inputDisplay)) {
        setInputDisplay(inputDisplay.toString().slice(1));
        setOutputDisplay(outputDisplay.slice(0, -(inputDisplay.length + 1)) + inputDisplay.toString().slice(1));
      } else if (outputDisplay.length !== inputDisplay.length) {
        setInputDisplay("-" + inputDisplay);
        setOutputDisplay(outputDisplay.slice(0, -inputDisplay.length) + "(-" + inputDisplay);
      } else {
        setInputDisplay("-" + inputDisplay);
        setOutputDisplay("(-" + inputDisplay);
      }
    } else if (inputDisplay.match(isOperator)) {
      if (outputDisplay.slice(-2) !== "(-") {
        setInputDisplay("-");
        setOutputDisplay(outputDisplay + "(-");
      } else {
        setInputDisplay("");
        setOutputDisplay(outputDisplay.slice(0, -2));
      }
    }
  }

  const initializedState = () => {
    setInputDisplay("0");
    setOutputDisplay("");
  }

  const eraseLast = () => {
    const outputDisplayReplace: string[] = outputDisplay
      .slice(0, -1)
      .replaceAll("(-", "(0")
      .split("");
    const operators: string[] = outputDisplayReplace.filter((x) => x.match(isOperator));
    const lastOperatorIndex: number = outputDisplayReplace.lastIndexOf(
      operators[operators.length - 1]
    );
    const openParenthesis: number = outputDisplayReplace.filter((x) => x === "(").length;
    const closeParenthesis: number = outputDisplayReplace.filter((x) => x === ")")
      .length;

    if (!outputDisplay.includes("=")) {
      if (
        (inputDisplay.length === 1 &&
          outputDisplay.length === 1) ||
        (inputDisplay === "0" && inputDisplay !== "0") ||
        outputDisplay === ""
      ) {
          setInputDisplay("0");
          setOutputDisplay("");
      } else if (outputDisplay.slice(-2, -1).match(isOperator)) {
          setInputDisplay(outputDisplay.slice(-2, -1));
          setOutputDisplay(outputDisplay.slice(0, -1));
      } else if (outputDisplay.slice(-2) === "(-") {
          setInputDisplay("");
          setOutputDisplay(outputDisplay.slice(0, -2));
      } else if (lastOperatorIndex < outputDisplay.length - 1) {
        if (outputDisplay.slice(-2, -1) !== ")") {
          if (openParenthesis === closeParenthesis) {
            setInputDisplay(outputDisplay.slice(lastOperatorIndex + 1, -1));
            setOutputDisplay(outputDisplay.slice(0, -1));
          } else {
            setInputDisplay(outputDisplay.slice(lastOperatorIndex + 2, -1));
            setOutputDisplay(outputDisplay.slice(0, -1));
          }
        } else {
          setInputDisplay(outputDisplay.slice(lastOperatorIndex + 2, -2));
          setOutputDisplay(outputDisplay.slice(0, -2));
        }
      }
    } else {
      if (outputDisplay.slice(-2, -1) !== ")") {
        setInputDisplay(outputDisplay.slice(lastOperatorIndex + 1, -1));
        setOutputDisplay(outputDisplay.slice(0, -1));
       } else {
        setInputDisplay(outputDisplay.slice(lastOperatorIndex + 2, -2));
        setOutputDisplay(outputDisplay.slice(0, -2));
       }
    }
  }

    return (
      <div>
        <OutputDisplay outputDisplay={outputDisplay} />
        <InputDisplay inputDisplay={inputDisplay} />
        <Buttons
          initialize={initializedState}
          updateDisplay={updateInputDisplay}
          erase={eraseLast}
          equale={handleResult}
          plusMinus={handlePlusMinus}
          decimal={handleDecimal}
        />
        <div className="text">
          Designed & Coded By <br />
          <a
            href="https://codepen.io/cristina_jura/full/WNONREr"
            target="blank"
            style={{ textDecoration: "none" }}
          >
            Cristina Jura
          </a>
        </div>
      </div>
    );
}

export default Calculator;

