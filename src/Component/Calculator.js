import React, { useState, useEffect } from 'react';
import NumberFormat from 'react-number-format';
import './calc.css';

function Calculator() {
  const [result, setResult] = useState("");
  const [num, setNum] = useState("");
  const [preState, setPreState] = useState("");
  const [operator, setOperator] = useState(null);
  const [input, setInput] = useState("0");

  const handleClick =(e) => {
    // setResult(result.concat(e.target.name));
    if (num.includes(".") && e.target.innerText === ".") return;

    if (result) {
      setPreState("");
    }

    num
      ? setNum((pre) => pre + e.target.innerText)
      : setNum(e.target.innerText);
    setResult(false);
  };
  
  useEffect(() => {
    setInput(num);
  }, [num]);

  useEffect(() => {
    setInput("0");
  }, []);

  const clear = () => {
    setResult("");
    setPreState("");
    setNum("");
    setInput("0");
  }

  const operatorType = (e) => {
    setResult(false);
    setOperator(e.target.innerText);
    if (num === "") return;
    if (preState !== "") {
      calculate();
    } else {
      setPreState(num);
      setNum("");
    }
  };

  const calculate = (e) => {
    if (e?.target.innerText === "=") {
      setResult(true);
    }
    let cal;
    switch (operator) {
      case "/":
        cal = String(parseFloat(preState) / parseFloat(num));
        break;

      case "+":
        cal = String(parseFloat(preState) + parseFloat(num));
        break;
      case "x":
        cal = String(parseFloat(preState) * parseFloat(num));
        break;
      case "-":
        cal = String(parseFloat(preState) - parseFloat(num));
        break;
      default:
        return;
    }
    setInput("");
    setPreState(cal);
    setNum("");
  };

  const minusPlus = () => {
    if (num.charAt(0) === "-") {
      setNum(num.substring(1));
    } else {
      setNum("-" + num);
    }
  };

  const percent = () => {
    preState
      ? setNum(String((parseFloat(num) / 100) * preState))
      : setNum(String(parseFloat(num) / 100));
  };

  return (
    <>

    <h3>Calculator</h3>
      <div className='container'>
        <form type="text" >
        {input  !== "" || input === "0" ? (
        <NumberFormat
              value={input}
              displayType={"text"}
              thousandSeparator={true}
            />
            ) : (
            <NumberFormat
              value={preState}
              displayType={"text"}
              thousandSeparator={true}
            />
          )}
          {/* <input type="text" value={input}/> */}
        </form>
            <div className='keypad'>
                  <button onClick={clear} id="top">AC</button>
                  {/* <button className="highlight" onClick={backspace} id="backspace">C</button> */}
                  {/* <button name='(' className="highlight" onClick={handleClick} >(</button> */}
                  {/* <button name=')' className="highlight" onClick={handleClick} >)</button> */}
                  <button name='-'  id="top"  onClick={minusPlus} >+/-</button>
                  <button name='%'  id="top" onClick={percent} >%</button>
                  <button className="highlight" name="/" onClick={operatorType}>/</button>
                  <button name="7" onClick={handleClick}>7</button>
                  <button name="8" onClick={handleClick}>8</button>
                  <button name="9" onClick={handleClick}>9</button>
                  <button className="highlight" name="*" onClick={operatorType}>x</button>
                  <button name="4" onClick={handleClick}>4</button>
                  <button name="5" onClick={handleClick}>5</button>
                  <button name="6" onClick={handleClick}>6</button>
                  <button className="highlight" name="-" onClick={operatorType}>-</button>
                  <button name="1" onClick={handleClick}>1</button>
                  <button name="2" onClick={handleClick}>2</button>
                  <button name="3" onClick={handleClick}>3</button>
                  <button className="highlight" name="+" onClick={operatorType}>+</button>
                  <button name="0" id='zero' onClick={handleClick}>0</button>
                  <button name="." onClick={handleClick}>.</button>
                  <button className="highlight" onClick={calculate} id="result">=</button>
            </div>
      </div>
    </>

  );
    
}

export default Calculator;
