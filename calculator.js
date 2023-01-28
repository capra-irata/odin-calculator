let operandStr = `0`;
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
}

function appendNumber(e) {
  // If the display reads 0, replace display instead of appending
  operandStr === `0`
    ? (operandStr = e.target.textContent)
    : (operandStr += e.target.textContent);

  updateDisplay();
}

function updateDisplay() {
  const display = document.querySelector(`#display`);
  display.textContent = operandStr;
}

function clearDisplay(e) {
  switch (e.target.textContent) {
    case `<<`:
      operandStr = operandStr.slice(0, -1);
      // If backspace would cause the display to be empty, set to 0 instead
      if (!operandStr) operandStr = `0`;
      break;
    case `C`:
      operandStr = `0`;
      break;
    case `AC`:
      // TODO
      break;
  }

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
