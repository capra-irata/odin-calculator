let operator = ``,
  operandA = ``,
  operandB = `0`,
  clearFlag = true; // When true, clear the display on next number pressed
initialize();

function initialize() {
  document.addEventListener(`onkeydown`, getKeypress);

  const numberButtons = document.querySelectorAll(`.number`);
  numberButtons.forEach((button) => {
    button.addEventListener(`click`, handleNumber);
  });

  const clearButtons = document.querySelectorAll(`.clear`);
  clearButtons.forEach((button) => {
    button.addEventListener(`click`, clearDisplay);
  });

  const operatorButtons = document.querySelectorAll(`.operator`);
  operatorButtons.forEach((button) => {
    button.addEventListener(`click`, storeOperand);
  });

  const equalsButton = document.querySelector(`#equals`);
  equalsButton.addEventListener(`click`, () => {
    if (!operator) return;
    operandB = operate(); // Operate on current operands and store
    operandA = ``;
    updateDisplay(operandB);
  });
}

// Tie numpad key presses to their respective buttons
function getKeypress(e) {
  switch (e.which) {
    // Backspace
    case 8:
      break;
    // Numbers
    case 48:
    case 49:
    case 50:
    case 51:
    case 52:
    case 53:
    case 54:
    case 55:
    case 56:
    case 57:
      break;
    // Operators
    case 42:
    case 43:
    case 45:
    case 47:
      break;
    // Enter or equals
    case 13:
    case 61:
      break;
    // Decimal
    case 46:
      break;
  }
}

function updateDisplay(newDisplayText) {
  const displayText = document.querySelector(`#display div`);
  displayText.textContent = newDisplayText;
}

function handleNumber(e) {
  // If the display reads 0 or an operator was recently pressed,
  // replace display instead of appending
  if (clearFlag || !operandA) {
    operandA = e.target.textContent;
    clearFlag = false;
  } else {
    operandA += e.target.textContent;
  }

  updateDisplay(operandA);
}

function clearDisplay(e) {
  switch (e.target.textContent) {
    case `<<`:
      operandA = operandA.slice(0, -1);
      break;
    case `C`:
      // Reset operandA but retain operator and operandB
      operandA = ``;
      break;
    case `AC`:
      // Reset everything to default state
      operator = ``;
      operandA = ``;
      operandB = `0`;
      clearFlag = true;
      break;
  }

  // If display would be empty, set to 0 instead
  updateDisplay(operandA || `0`);
}

function storeOperand(e) {
  if (!operandB) {
    // Prepare for first operation
    operandB = operandA;
  } else {
    // Otherwise, handle chained operations
    operandB = operate();
    updateDisplay(operandB);
  }
  operator = e.target.textContent;
  clearFlag = true; // Helps handleNumber() with updating display properly
}

function operate() {
  let result;
  switch (operator) {
    // Convert operands to numbers for arithmetic
    case `+`:
      result = add(+operandB, +operandA);
      break;
    case `-`:
      result = subtract(+operandB, +operandA);
      break;
    case `*`:
      result = multiply(+operandB, +operandA);
      break;
    case `/`:
      result = divide(+operandB, +operandA);
      break;
  }

  return result.toString();
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
