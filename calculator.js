let operator = ``,
  operatorSelected = false,
  currentOperand = ``,
  storedOperand = ``;
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
    currentOperand = ``;
    updateDisplay(storedOperand);
  });
}

function updateDisplay(newDisplayText) {
  const displayText = document.querySelector(`#display .text`);
  displayText.textContent = newDisplayText;
}

function appendNumber(e) {
  // If the display reads 0 or an operator was recently pressed,
  // replace display instead of appending
  if (operatorSelected || !currentOperand) {
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
      break;
    case `C`:
      // Reset currentOperand but retain operator and storedOperand
      currentOperand = ``;
      break;
    case `AC`:
      // Reset everything to default state
      operator = ``;
      operatorSelected = false;
      currentOperand = ``;
      storedOperand = ``;
      break;
  }

  // If display would be empty, set to 0 instead
  updateDisplay(currentOperand || `0`);
}

function storeOperand(e) {
  if (!storedOperand) {
    // Prepare for first operation
    storedOperand = currentOperand;
  } else {
    // Otherwise, handle chained operations
    storedOperand = operate();
    updateDisplay(storedOperand);
  }
  operator = e.target.textContent;
  operatorSelected = true; // Helps appendNumber() with handling display properly
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
