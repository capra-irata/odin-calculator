let operator = ``,
  operatorSelected = false,
  currentOperand = `0`,
  storedOperand = `0`;
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

  const operatorButtons = document.querySelectorAll(
    `#operator-section .operator`
  );
  operatorButtons.forEach((button) => {
    button.addEventListener(`click`, storeOperand);
  });

  const equalsButton = document.querySelector(`#equals`);
  equalsButton.addEventListener(`click`, () => {
    if (!operator) return;
    storedOperand = operate(); // Operate on current operands and store
    updateDisplay(storedOperand);
  });
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
      // Reset currentOperand but retain operator and storedOperand
      currentOperand = `0`;
      break;
    case `AC`:
      // Reset everything to default state
      operator = ``;
      operatorSelected = false;
      currentOperand = `0`;
      storedOperand = `0`;
      break;
  }

  updateDisplay(currentOperand);
}

function storeOperand(e) {
  operatorSelected = true; // Helps appendNumber() with handling display properly
  operator = e.target.textContent;
  const display = document.querySelector(`#display`);
  storedOperand = display.textContent;
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

function operate() {
  let result;
  switch (operator) {
    // Convert operands to numbers for arithmetic
    case `+`:
      result = add(+storedOperand, +currentOperand);
      break;
    case `-`:
      result = subtract(+storedOperand, +currentOperand);
      break;
    case `*`:
      result = multiply(+storedOperand, +currentOperand);
      break;
    case `/`:
      result = divide(+storedOperand, +currentOperand);
      break;
  }

  return result.toString();
}
