import { useState } from 'react';
import './Calculator.css';

function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const handleEqual = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  return (
    <div className="calculator">
      <div className="calculator-display">{display}</div>
      <div className="calculator-buttons">
        <button className="btn btn-clear" onClick={clear}>C</button>
        <button className="btn btn-operation" onClick={() => performOperation('/')}>/</button>
        <button className="btn btn-operation" onClick={() => performOperation('*')}>×</button>
        <button className="btn btn-operation" onClick={() => performOperation('-')}>−</button>
        
        <button className="btn" onClick={() => inputDigit(7)}>7</button>
        <button className="btn" onClick={() => inputDigit(8)}>8</button>
        <button className="btn" onClick={() => inputDigit(9)}>9</button>
        <button className="btn btn-operation" onClick={() => performOperation('+')}>+</button>
        
        <button className="btn" onClick={() => inputDigit(4)}>4</button>
        <button className="btn" onClick={() => inputDigit(5)}>5</button>
        <button className="btn" onClick={() => inputDigit(6)}>6</button>
        <button className="btn btn-equal" onClick={handleEqual}>=</button>
        
        <button className="btn" onClick={() => inputDigit(1)}>1</button>
        <button className="btn" onClick={() => inputDigit(2)}>2</button>
        <button className="btn" onClick={() => inputDigit(3)}>3</button>
        <button className="btn btn-zero" onClick={() => inputDigit(0)}>0</button>
        <button className="btn" onClick={inputDecimal}>.</button>
      </div>
    </div>
  );
}

export default Calculator;
