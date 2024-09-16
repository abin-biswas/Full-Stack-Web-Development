const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let previousInput = '';
let operator = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.dataset.value;

    if (value === 'AC') {
      currentInput = '';
      previousInput = '';
      operator = '';
    } else if (value === '+/-') {
      currentInput = currentInput * -1;
    } else if (value === '%') {
      currentInput = currentInput / 100;
    } else if (value === '=' && operator && previousInput !== '' && currentInput !== '') {
      calculate();
    } else if (value === '.' && !currentInput.includes('.')) {
      currentInput += value;
    } else if (value === '+' || value === '-' || value === '*' || value === '/') {
      if (operator && currentInput !== '') {
        calculate();
      }
      previousInput = currentInput;
      currentInput = '';
      operator = value;
    } else if (value !== '') {
      currentInput += value;
    }

    // Update the display with the full expression only if no result is calculated
    if (value !== '=') {
      display.value = previousInput + operator + currentInput;
    }
  });
});

function calculate() {
  let result;

  // Check for zero division
  if (operator === '/' && currentInput === '0') {
    display.value = 'Error: Division by zero';
    currentInput = '';
    return;
  }

  try {
    // Parse numbers and perform calculation
    result = eval(previousInput + operator + currentInput);
  } catch (error) {
    // Handle errors (e.g., invalid expressions)
    display.value = 'Error: Invalid expression';
    currentInput = '';
    return;
  }

  // Check for overflow/underflow
  if (!isFinite(result)) {
    display.value = 'Error: Overflow or underflow';
    currentInput = '';
    return;
  }

  // Update currentInput with the result to allow further operations
  currentInput = result.toString();
  previousInput = '';
  operator = '';

  // Display the result
  display.value = currentInput;
}