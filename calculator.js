initialize();

function initialize() {
  const numberButtons = document.querySelectorAll(`#number-section .number`);
  numberButtons.forEach((button) => {
    button.addEventListener(`click`, appendNumber);
  });
}

function appendNumber(e) {
  const display = getDisplayNode();
  // If the display reads 0, replace display instead of appending
  display.textContent === `0`
    ? display.textContent = e.target.textContent
    : display.textContent = display.textContent + e.target.textContent;
}

function getDisplayNode() {
  return document.querySelector(`#display`);
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
