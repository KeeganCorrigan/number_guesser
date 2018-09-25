let guessField = document.querySelector('.guessField');
let min = parseInt(document.getElementById('minNumberField').value) || 1;
let max = parseInt(document.getElementById('maxNumberField').value) || 100;
let randomNumber = newRandomNumber();

document.getElementById("reset").disabled = true
document.getElementById("clear").disabled = true
document.getElementById("guessSubmit").addEventListener('click', validateGuess);
document.getElementById("reset").addEventListener('click', reset);
document.getElementById("minMaxSubmit").addEventListener('click', setUserChosenRange);

function newRandomNumber() {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setUserChosenRange() {
  min = Number(document.querySelector('.minNumberField').value) || 1;
  max = Number(document.querySelector('.maxNumberField').value) || 100;
  randomNumber = newRandomNumber();
}

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

function checkGuess(userGuess, randomNumber) {
  if (userGuess === randomNumber) {
    document.getElementById("guessChecker").textContent = "BOOM!";
    document.getElementById("winStateUpdate").textContent = "You won and things got a little harder. Random number range increased by 20."
    setTimeout ("winStateInformation()", 3000);
    winStateIncreaseRange();
  }
  else if (userGuess > randomNumber) {
    document.getElementById("guessChecker").textContent = "That is too high";
  }
  else if (userGuess < randomNumber) {
    document.getElementById("guessChecker").textContent = "That is too low";
  }
};

function winStateInformation() {
  document.getElementById("winStateUpdate").textContent = ""
}

function winStateIncreaseRange() {
  min = min - 10;
  max = max + 10;
  randomNumber = newRandomNumber();
}

function resetErrors() {
  document.getElementById("invalidGuess").textContent = "";
}

function returnErrorOutOfRange(guess) {
  if (min > guess || guess > max) {
    document.getElementById("invalidGuess").textContent = "Number outside of range"
    return false
  }
}

function returnErrorNaN(guess) {
  if (isNaN(guess)) {
    document.getElementById("invalidGuess").textContent = "That's not a number"
    return false
  }
}

function reset() {
  location.reload();
}

function clearToggle() {
  if (document.getElementById('guessField').value.length <= 0) {
    document.getElementById("clear").disabled = true
  } else if(document.getElementById('guessField').value.length > 0) {
    document.getElementById("clear").disabled = false
  }
}

function clearGuessField() {
  document.getElementById('guessField').value = '';
  document.getElementById("clear").disabled = true;
}
