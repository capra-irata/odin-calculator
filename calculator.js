let currentOperand = `0`;
let storedOperand = `0`;
let operator, operatorSelected = false;
initialize();

function initialize() {
  const numberButtons = document.querySelectorAll(`#number-section .number`);
  numberButtons.forEach((button) => {
    button.addEventListener(`click`, appendNumber);
  });

  const clearButtons = document.querySelectorAll(`#clear-section button`);
  clearButtons.forEach((button) => {
    button.addEventListener(`click`, clearDisplay);
  });

  const operatorButtons = document.querySelectorAll(`#operator-section .operator`);
  operatorButtons.forEach((button) => {
    button.addEventListener(`click`, storeOperand);
  });

  const equalsButton = document.querySelector(`#equals`);
  equalsButton.addEventListener(`click`, evaluate);
}

function updateDisplay(newDisplay) {
  const display = document.querySelector(`#display`);
  display.textContent = newDisplay;
}

function appendNumber(e) {
  // If the display reads 0 or an operator was recently pressed,
  // replace display instead of appending
  if (operatorSelected || currentOperand === `0`) {
    currentOperand = e.target.textContent;
    operatorSelected = false;
  } else {
    currentOperand += e.target.textContent;
  }

  updateDisplay(currentOperand);
}

function clearDisplay(e) {
  switch (e.target.textContent) {
    case `<<`:
      currentOperand = currentOperand.slice(0, -1);
      // If backspace would cause the display to be empty, set to 0 instead
      if (!currentOperand) currentOperand = `0`;
      break;
    case `C`:
      currentOperand = `0`;
      break;
    case `AC`:
      // TODO
      break;
  }

  updateDisplay(currentOperand);
}

function storeOperand(e) {
  operatorSelected = true;
  operator = e.target.textContent;
  const display = document.querySelector(`#display`);
  storedOperand = display.textContent;
}

function evaluate(e) {
  if (!operator) return;
  storedOperand = operate(storedOperand, currentOperand, operator);
  updateDisplay(storedOperand);
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return b === 0 ? `ERR: div by 0` : a / b;
}

function operate(a, b, operator) {
  let result;
  switch (operator) {
    case `+`:
      result = add(+a, +b);
      break;
    case `-`:
      result = subtract(+a, +b);
      break;
    case `*`:
      result = multiply(+a, +b);
      break;
    case `/`:
      result = divide(+a, +b);
      break;
  }

  return result.toString();
}
