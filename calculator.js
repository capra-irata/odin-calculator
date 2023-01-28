// let displayText = getDisplayNode().textContent;
const display = document.querySelector(`#display`);
initialize();

// function getDisplayNode() {
//   return document.querySelector(`#display`);
// }

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
  // const display = getDisplayNode();
  // If the display reads 0, replace display instead of appending
  display.textContent === `0`
    ? (display.textContent = e.target.textContent)
    : (display.textContent += e.target.textContent);
  // display.textContent = displayText;
}

function clearDisplay(e) {
  // const display = getDisplayNode();
  switch (e.target.textContent) {
    case `<<`:
      display.textContent = display.textContent.slice(0, -1);
      // If backspace would cause the display to be empty, set to 0 instead
      if (!display.textContent) display.textContent = `0`;
      break;
    case `C`:
      display.textContent = `0`;
      break;
    case `AC`:
      // TODO
      break;
  }
  // display.textContent = displayText;
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
