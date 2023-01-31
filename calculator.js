let operator = ``,
  operandA = ``,
  operandB = `0`, // Note that operands are strings until they're operated on
  flagClear = true; // When true, clear the display on next number pressed
initialize();

function initialize() {
  document.addEventListener(`onkeydown`, getKeypress);

  const numberButtons = document.querySelectorAll(`.number`);
  numberButtons.forEach((button) => {
    button.addEventListener(`click`, handleNumber);
  });

  const clearButtons = document.querySelectorAll(`.clear`);
  clearButtons.forEach((button) => {
    button.addEventListener(`click`, handleClear);
  });

  const operatorButtons = document.querySelectorAll(`.operator`);
  operatorButtons.forEach((button) => {
    button.addEventListener(`click`, handleOperator);
  });

  const equalsButton = document.querySelector(`#equals`);
  equalsButton.addEventListener(`click`, () => {
    if (operator) {
      operandB = operate(); // Operate on current operands and store result
      operator = ``; // Necessary to properly handle subsequent operations
      updateDisplay(operandB);
    }

    flagClear = true;
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
  // If clear flag is set, replace display instead of appending number
  if (flagClear) {
    operandB = e.target.textContent;
    flagClear = false;
  } else {
    operandB += e.target.textContent;
  }

  updateDisplay(operandB);
}

function handleClear(e) {
  switch (e.target.textContent) {
    case `<<`:
      // If operandB would be empty after slice, set to 0 instead
      operandB = operandB.slice(0, -1) || `0`;
      break;
    case `C`:
      // Reset operandB but retain operator and operandA
      operandB = `0`;
      break;
    case `AC`:
      // Reset everything to default state
      operator = ``;
      operandA = ``;
      operandB = `0`;
      break;
  }

  if (operandB === `0`) flagClear = true;
  updateDisplay(operandB);
}

function handleOperator(e) {
  // If a previous operator was pressed, operate on the stored operands
  if (operator) {
    operandA = operate();
    updateDisplay(operandA);
  } else {
    operandA = operandB;
  }

  flagClear = true;
  operator = e.target.textContent;
}

function operate() {
  switch (operator) {
    // Convert operands to numbers for arithmetic, convert result to string before return
    case `+`:
      return add(+operandA, +operandB).toString();
    case `-`:
      return subtract(+operandA, +operandB).toString();
    case `*`:
      return multiply(+operandA, +operandB).toString();
    case `/`:
      return divide(+operandA, +operandB).toString();
  }
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
