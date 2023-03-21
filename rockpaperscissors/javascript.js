function computerPlay() {
  // Let the computer make it's choice
  return validOptionArray[
    Math.floor(Math.random() * validOptionArray.length)
  ].toLocaleLowerCase();
}

function isValid(playerSelection) {
  return validOptionArray.includes(playerSelection);
}

function playRound(playerSelection, computerSelection) {
  // Convert user input to lowercase for deciding the winner in the function underneath
  playerSelection = playerSelection.toLowerCase();

  // Check if value is valid
  if (!isValid(playerSelection)) {
    return "Please enter Rock, Paper, or Scissors and try again";
  }

  let result = decideWinner(playerSelection, computerSelection);

  // Capitalize playerSelection and computerSelection so it looks neat upon notifying the player
  playerSelection = capitalize(playerSelection);
  computerSelection = capitalize(computerSelection);

  return displayResults(result, playerSelection, computerSelection);
}

function displayResults(result, playerSelection, computerSelection) {
  // Notify player about the outcome of the round
  if (result == "win") {
    return `You Win! ${playerSelection} beats ${computerSelection}!`;
  } else if (result == "lose") {
    return `You lose! ${computerSelection} beats ${playerSelection}!`;
  } else if (result == "tie") {
    return "It's a tie!";
  } else {
    return "Something went wrong!";
  }
}

function decideWinner(playerSelection, computerSelection) {
  let win, lose, tie;
  // Decide the winner using if statements
  if (playerSelection === "rock") {
    if (computerSelection === "paper") {
      lose = true;
    } else if (computerSelection === "rock") {
      tie = true;
    } else if (computerSelection === "scissors") {
      win = true;
    }
  } else if (playerSelection === "paper") {
    if (computerSelection === "scissors") {
      lose = true;
    } else if (computerSelection === "paper") {
      tie = true;
    } else if (computerSelection === "rock") {
      win = true;
    }
  } else if (playerSelection === "scissors") {
    if (computerSelection === "rock") {
      lose = true;
    } else if (computerSelection === "scissors") {
      tie = true;
    } else if (computerSelection === "paper") {
      win = true;
    }
  }

  if (win) {
    playerWinCount++;
    return "win";
  } else if (tie) {
    return "tie";
  } else {
    computerWinCount++;
    return "lose";
  }
}

function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1);
}

function updateCounters(roundResult) {
  roundCounterDiv.textContent = `Rounds Played: ${roundsPlayed}`;
  scoreDiv.textContent = `Player ${playerWinCount} : ${computerWinCount} Computer`;
  const result = document.createElement("div");
  result.textContent = roundResult;
  result.classList.add("result");
  resultDiv.appendChild(result);
}

function addRoundToDiv(roundResult) {
  roundCounterDiv.textContent = `Rounds Played: ${roundsPlayed}`;
  scoreDiv.textContent = `Player ${playerWinCount} : ${computerWinCount} Computer`;
  resultDiv.appendChild(roundResult);
}

function resetCounters() {
  roundsPlayed = 0;
  playerWinCount = 0;
  computerWinCount = 0;
}

function endGame() {
  const finalScoreDiv = document.getElementById("finalScore");
  const result = document.createElement("div");
  result.textContent = `The End! The final score is ${playerWinCount} : ${computerWinCount}`;
  finalScoreDiv.appendChild(result);
  newGame = true;
}

function resetGame() {
  const finalScoreDiv = document.getElementById("finalScore");
  resetCounters();
  resultDiv.innerText = "";
  finalScoreDiv.innerText = "";
  newGame = false;
}

const validOptionArray = ["rock", "paper", "scissors"];
let roundsPlayed = 0;
let playerWinCount = 0;
let computerWinCount = 0;
let newGame = false;

const resultDiv = document.querySelector("#results");
const buttons = document.querySelectorAll("button");
const roundCounterDiv = document.querySelector("#roundCounter");
const scoreDiv = document.querySelector("#score");

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (newGame) {
      resetGame();
    }

    let roundResult = playRound(e.target.id, computerPlay());
    roundsPlayed++;

    updateCounters(roundResult);

    if (playerWinCount == 5 || computerWinCount == 5) {
      endGame();
    }
  });
});