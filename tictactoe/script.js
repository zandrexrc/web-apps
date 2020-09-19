// Store all cells in an array
var cells = document.querySelectorAll("td");

// Add event listener to cells
for (var i = 0; i < cells.length; i++) {
  cells[i].setAttribute("onclick", "mark("+i+")");
}


// Keep track of the game status
var gameOver = false;
var moveNumber = 0;

// Get the symbol of the current player (x or o)
function getCurrentPlayer() {
  if (moveNumber % 2 == 0) {
    return "x";
  } else {
    return "o";
  }
}

// Mark a cell
function mark(cellID) {
  if (!gameOver && cells[cellID].innerHTML == "") {
    // Update cell
    cells[cellID].innerHTML = getCurrentPlayer();

    // Check for a winner
    if (checkWinner() != null) {
      alert("Player " + getCurrentPlayer() + " has won!");
      gameOver = true;
      document.querySelector("#gameStatus").innerHTML = getCurrentPlayer() + " won";
    }

    // Check for a draw
    if (checkDraw()) {
      alert("Game ended in a draw.");
      gameOver = true;
      document.querySelector("#gameStatus").innerHTML = "draw";
    }

    if (!gameOver) {
      // Update move number
      moveNumber++;

      // Update game status display
      document.querySelector("#gameStatus").innerHTML = getCurrentPlayer() + " to move";
    }

  }
}


// Create a set of all index combinations to check for a win
var winIndices = [
  // horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // diagonal
  [0, 4, 8],
  [6, 4, 2]
];

// Check for winner
function checkWinner() {
  let winner = null;
  for (var i = 0; i < winIndices.length; i++) {
    let line = winIndices[i];
    let lineValues = [
      cells[line[0]].innerHTML,
      cells[line[1]].innerHTML,
      cells[line[2]].innerHTML
    ];

    // Check if all values in the line are the same
    if (!(lineValues.includes(""))) {
      if (lineValues.every((v, i, array) => v == array[0])) {
        winner = lineValues[0];
        break;
      }
    }
  }
  return winner;
}

// Check for draw
function checkDraw() {
  return (checkWinner() == null && moveNumber == 8);
}
