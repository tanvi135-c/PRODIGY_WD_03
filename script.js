const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("statusText");
const restartBtn = document.getElementById("restartBtn");

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0,1,2], [3,4,5], [6,7,8], // Rows
  [0,3,6], [1,4,7], [2,5,8], // Columns
  [0,4,8], [2,4,6]           // Diagonals
];

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (gameState[index] !== "" || !gameActive) return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (currentPlayer === "X") {
    e.target.classList.add("text-glow-x");
  } else {
    e.target.classList.add("text-glow-o");
  }

  if (checkWinner()) {
    statusText.textContent = `${currentPlayer} wins! 🎉`;
    gameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    statusText.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s turn`;
}


function checkWinner() {
   for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (
      gameState[a] === currentPlayer &&
      gameState[b] === currentPlayer &&
      gameState[c] === currentPlayer
    ) {
      return true;
    }
  }
  return false;
}

function restartGame() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => cell.textContent = "");
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = `${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
restartBtn.addEventListener("click", restartGame);
statusText.textContent = `${currentPlayer}'s turn`;
