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

  document.querySelector(`.decimal`).addEventListener(`click`, handleDecimal);
  document.querySelector(`.equals`).addEventListener(`click`, handleEquals);
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

function updateDisplay(str) {
  const display = document.querySelector(`.display-text`);

  if (str.length > 10) {
    // If the display would overflow, convert to scientific notation and shrink font size
    str = parseFloat(str).toExponential(8);
    !display.classList.contains(`shrink-to-fit`) &&
      display.classList.add(`shrink-to-fit`);
  } else {
    // If the str can fit display and font size is currently shrunk, undo shrink
    display.classList.contains(`shrink-to-fit`) &&
      display.classList.remove(`shrink-to-fit`);
  }

  display.textContent = str;
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

function handleDecimal() {
  if (flagClear) {
    operandB = `0`;
    flagClear = false;
  }

  if (!operandB.includes(`.`)) {
    operandB += `.`;
    updateDisplay(operandB);
  }
}

function handleEquals() {
  if (operator) {
    operandB = operate(); // Operate on current operands and store result
    operator = ``; // Necessary to properly handle subsequent operations
    updateDisplay(operandB);
  }

  flagClear = true;
}

function operate() {
  let result;

  switch (operator) {
    // Convert operand strings to numbers for arithmetic
    case `+`:
      result = add(+operandA, +operandB);
      break;
    case `-`:
      result = subtract(+operandA, +operandB);
      break;
    case `*`:
      result = multiply(+operandA, +operandB);
      break;
    case `/`:
      result = divide(+operandA, +operandB);
      break;
  }

  // TODO Implement more accurate, reliable solution
  // Deal with inaccurate binary floating point arithmetic
  result = result.toFixed(8);

  // Remove trailing zeroes
  return result.replace(/(\.\d*[1-9])0+$|\.0*$/, "$1");
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
  return b === 0 ? `UNDEFINED` : a / b;
}
