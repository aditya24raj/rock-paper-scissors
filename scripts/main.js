let humanScore = 0;
let computerScore = 0;

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

function playRound() {
  const humanChoice = getHumanChoice();
  console.log(`you[${humanScore}]: ${humanChoice}`);

  const computerChoice = getComputerChoice();
  console.log(`Bot[${computerScore}]: ${computerChoice}`);

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
    console.log("Draw!");
  } else if (getWinsAgainst(humanChoice) === computerChoice) {
    humanScore++;
    console.log(`You win! ${humanChoice} beats ${computerChoice}`);
  } else {
    computerScore++;
    console.log(`You lose! ${computerChoice} beats ${humanChoice}`);
  }
  console.log("");
}

function playGame() {
  playRound();
  playRound();
  playRound();
  playRound();
  playRound();

  if (humanScore == computerScore) {
    console.log("Draw!");
  } else if (humanScore > computerScore) {
    console.log("You win!");
  } else {
    console.log("You lose!");
  }
}

playGame();
