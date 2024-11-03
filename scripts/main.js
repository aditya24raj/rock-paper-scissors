const maxScore = 5;
let humanScore = 0;
let computerScore = 0;
const gameLog = document.getElementById("game-log");

function getComputerChoice() {
  const choice = Math.floor(Math.random() * 3);
  if (choice === 0) {
    return "rock";
  } else if (choice === 1) {
    return "paper";
  } else if (choice === 2) {
    return "scissors";
  } else {
    throw new Error("invalid choice");
  }
}

function getHumanChoice() {
  const choice = prompt("Enter your choice(rock, paper, scissors): ");
  const validChoice =
    choice && (choice === "rock" || choice == "paper" || choice == "scissors");

  if (validChoice) {
    return choice.toLowerCase();
  } else {
    throw new Error("invalid choice");
  }
}

function appendToGameLog(textToAppend) {
  const logElement = document.createElement("div");
  logElement.textContent = textToAppend;
  gameLog.appendChild(logElement);
  gameLog.scrollTop = gameLog.scrollHeight;
}

function playRound(humanChoice) {
  document.getElementById("human-choice").textContent = humanChoice;

  const computerChoice = getComputerChoice();
  document.getElementById("computer-choice").textContent = computerChoice;

  function getWinsAgainst(choice) {
    if (choice === "paper") {
      // paper wins against rock
      return "rock";
    } else if (choice === "rock") {
      // rock wins against scissors
      return "scissors";
    } else if (choice === "scissors") {
      // and scissors wins against paper
      return "paper";
    }
  }

  if (humanChoice == computerChoice) {
    document.getElementById("game-round-status").textContent = "Draw!";
  } else if (getWinsAgainst(humanChoice) === computerChoice) {
    humanScore++;
    document.getElementById("human-score").textContent = humanScore;
    document.getElementById(
      "game-round-status"
    ).textContent = `You win! ${humanChoice} beats ${computerChoice}.`;
  } else {
    computerScore++;
    document.getElementById("computer-score").textContent = computerScore;

    document.getElementById(
      "game-round-status"
    ).textContent = `You lose! ${computerChoice} beats ${humanChoice}.`;
  }
}

function toggleReplay() {
  document.querySelectorAll("#make-a-choice .choice").forEach((choice) => {
    choice.disabled = !choice.disabled;
  });

  const replayButton = document.querySelector("#make-a-choice .replay");
  if (replayButton.hasAttribute("hidden")) {
    replayButton.removeAttribute("hidden");
  } else {
    replayButton.setAttribute("hidden", "true");
    humanScore = 0;
    computerScore = 0;

    document.getElementById("human-score").textContent = 0;
    document.getElementById("computer-score").textContent = 0;

    document.getElementById("human-choice").textContent = null;
    document.getElementById("computer-choice").textContent = null;

    document.getElementById("game-round-status").textContent = null;
    document.getElementById("computer-choice").textContent = null;
  }
}

document.querySelectorAll("#make-a-choice .choice").forEach((choice) => {
  choice.addEventListener("click", (event) => {
    playRound(event.target.name);
    if (humanScore >= maxScore || computerScore >= maxScore) {
      const finalStatus = document.getElementById("final-status");
      if (humanScore == computerScore) {
        finalStatus.textContent = "Final result : Draw!";
      } else if (humanScore > computerScore) {
        finalStatus.textContent = "Final result : You win!";
      } else {
        finalStatus.textContent = "Final result : You lose!";
      }
      toggleReplay();
    }
  });
});

document
  .querySelector("#make-a-choice .replay")
  .addEventListener("click", toggleReplay);
