// This guessfield variable allows me to access the user input value in the guessfield. Technically this is unnecessary, but it does shorten the code a bit.

let guessField = document.querySelector('.guessField');

// These memoized min and max variables allow me to set the range to either the user selected range or the default range. I think, technically, setUserChosenRange is doing most of the heavy lifting, but I wanted to incorporate parseInt in here somewhere to experiment with it.

let min = parseInt(document.getElementById('minNumberField').value) || 1;
let max = parseInt(document.getElementById('maxNumberField').value) || 100;

// this generated a newRandomNumber based on hte max and min values! This is great because it works with the default and user input.

let randomNumber = newRandomNumber();

// These lines disable buttons the first time you visit the page. There is nothing to clear and nothing to reset.

document.getElementById("reset").disabled = true
document.getElementById("clear").disabled = true

// I was playing around with event listeners here. I don't know what best practice is though, do I tie a button click to an event listener or have it perform a function onclick? This seems more malleable though.

document.getElementById("guessSubmit").addEventListener('click', validateGuess);
document.getElementById("reset").addEventListener('click', reset);
document.getElementById("minMaxSubmit").addEventListener('click', setUserChosenRange);

// See the randomNumber variable that calls this function above!

function newRandomNumber() {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// This allows the user to set the range BUT if no value is given and a number is still submitted it will default to 1 - 100. This does not validate for max being higher than min, but I'll add that in later. It also reassigns min and max, as well as reassigns a new randomNumber, hence using let instead of const for these variables.

function setUserChosenRange() {
  min = Number(document.querySelector('.minNumberField').value) || 1;
  max = Number(document.querySelector('.maxNumberField').value) || 100;
  randomNumber = newRandomNumber();
}

// The validateGuess function is doing most of the heavy lifting. After a user submits their guess it assigns that value to userGuess, enables the reset button, resets the erro fields, and then performs validations (is it a number, is the number out of range). It then populates the page with text indicating what the guess was and checks whether the guess, was, you know... too high, too low, or just right.

function validateGuess() {
  let userGuess = Number(guessField.value);
  document.getElementById("reset").disabled = false
  resetErrors();
  if  (returnErrorNaN(userGuess) === false || returnErrorOutOfRange(userGuess) === false) {
    return;
  }
  document.getElementById("lastGuess").textContent = "Your last guess was";
  document.getElementById("guessAmount").textContent = userGuess;
  checkGuess(userGuess, randomNumber);
};

// After the guess has been validated it is checked. This generates the text for incorrect, but still valid, guesses. It also calls a function (winStateInformation()) to briefly display a notification that you won and that the game became harder. It also increments the possible range of ranges by 20 (reducing the minimum by 10 and increasing the maximum by 10 as well).

function checkGuess(userGuess, randomNumber) {
  if (userGuess === randomNumber) {
    document.getElementById("guessChecker").textContent = "BOOM!";
    document.getElementById("winStateUpdate").textContent = "You won and things got a little harder. Random number range increased by 20."
    setTimeout ("winStateInformation()", 3000);
    winStateIncreaseRange();
  }
  else if (userGuess > randomNumber) {
    // This fills in the p tag guessChecker with the appropriate text if the number guessed is too high or too low.
    document.getElementById("guessChecker").textContent = "That is too high";
  }
  else if (userGuess < randomNumber) {
    document.getElementById("guessChecker").textContent = "That is too low";
  }
};

// This resets the information displayed in the winStateUpdate p tag to an empty string. It is used in conjunction with setTimeout to remove the text after 3 seconds.

function winStateInformation() {
  document.getElementById("winStateUpdate").textContent = ""
}

// This function is called when a player guesses the correct number. It is responsible for generating a new, harder, random number after increasing the valid range for selection.

function winStateIncreaseRange() {
  min = min - 10;
  max = max + 10;
  randomNumber = newRandomNumber();
}

// This resets the errors that are displayed after a new number has been guessed.

function resetErrors() {
  document.getElementById("invalidGuess").textContent = "";
}

// This function validates whether a guess is outside of the min and max ranges for valid number selection. This is fairly dynamic and updates automatically based on whatever the current min and max are.

function returnErrorOutOfRange(guess) {
  if (min > guess || guess > max) {
    document.getElementById("invalidGuess").textContent = "Number outside of range"
    return false
  }
}

// Javascript includes a NaN method! This just checks to see that whatever was input into the guess field was actually a number. In conjunction with returnErrorOutOfRange, these are the two most important validations for submitting user input for the number guesser game.

function returnErrorNaN(guess) {
  if (isNaN(guess)) {
    document.getElementById("invalidGuess").textContent = "That's not a number"
    return false
  }
}

// It seemed obtuse to reset information individually (which is easy enough, but a lot of unnecessary text). I simply reloaded the page to completely reset the game.

function reset() {
  location.reload();
}

// This was one of the more difficult functions to write. Mainly because I needed to use an onkeyup to verify whether or not the user had anything in the guess field. This function simply toggles the clear button to active or inactive based on whether there is any content in the guessField.

function clearToggle() {
  if (document.getElementById('guessField').value.length <= 0) {
    document.getElementById("clear").disabled = true
  } else if(document.getElementById('guessField').value.length > 0) {
    document.getElementById("clear").disabled = false
  }
}

// And finally, this functions resets the guessField to an empty string and ALSO disables the clear button. By default, once the field is an empty string, there's nothing left to clear!

function clearGuessField() {
  document.getElementById('guessField').value = '';
  document.getElementById("clear").disabled = true;
}
