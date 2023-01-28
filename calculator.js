let currentOperand = `0`;
let storedOperand = `0`;
let operator;
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

  const operatorButtons = document.querySelectorAll(`#operator-section button`);
  operatorButtons.forEach((button) => {
    button.addEventListener(`click`, storeOperand);
  });
}

function updateDisplay() {
  const display = document.querySelector(`#display`);
  display.textContent = currentOperand;
}

function appendNumber(e) {
  // If the display reads 0, replace display instead of appending
  currentOperand === `0`
    ? (currentOperand = e.target.textContent)
    : (currentOperand += e.target.textContent);

  updateDisplay();
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

  updateDisplay();
}

function storeOperand(e) {
  operator = e.target.textContent;
  storedOperand = currentOperand;
  currentOperand = `0`;
  updateDisplay();
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
  switch (operator) {
    case `+`:
      return add(a, b);
    case `-`:
      return subtract(a, b);
    case `*`:
      return multiply(a, b);
    case `/`:
      return divide(a, b);
  }
}
