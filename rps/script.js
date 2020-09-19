// Views
var p1imgDisplay = document.querySelector("#p1hand");
var p2imgDisplay = document.querySelector("#p2hand");
var p1scoreDisplay = document.querySelector("#p1score");
var p2scoreDisplay = document.querySelector("#p2score");
var statusDisplay = document.querySelector("#status");
var playButton = document.querySelector("#playbutton");

// Images
var handImages = {
  "p1": {
    "rock": "images/1r.png",
    "paper": "images/1p.png",
    "scissors": "images/1s.png",
    "unknown": "images/1q.png"
  },
  "p2": {
    "rock": "images/2r.png",
    "paper": "images/2p.png",
    "scissors": "images/2s.png",
    "unknown": "images/2q.png"
  }
};


// Initialize game values
var p1choice = "unknown";
var p2choice = "unknown";
var p1score = 0;
var p2score = 0;


// Map char IDs from keypress events to game values
var keypressMap = {
  "65": {"value": "rock", "player": "p1"},
  "83": {"value": "paper", "player": "p1"},
  "68": {"value": "scissors", "player": "p1"},
  "37": {"value": "rock", "player": "p2"},
  "40": {"value": "paper", "player": "p2"},
  "39": {"value": "scissors", "player": "p2"}
};

// Add listener for keypress events
document.addEventListener("keydown", play);

// Get input from players
function play(event) {
  let key = event.keyCode;
  key = key.toString();

  // Check if key pressed is valid
  if (Object.keys(keypressMap).includes(key)) {
    // Assign value to player
    let player = keypressMap[key].player;
    let value = keypressMap[key].value;

    if (player == "p1") {
      p1choice = value;
    } else {
      p2choice = value;
    }
  }
}


// Determine the outcome of a match
function getResult() {
  let resultMessage = "";

  // Check if both players sent in their choices
  if (p1choice == "unknown" && p2choice == "unknown") {
    resultMessage = "Error: Both players failed to play";
  } else if (p1choice == "unknown") {
    resultMessage = "Error: Player 1 failed to play";
  } else if (p2choice == "unknown") {
    resultMessage = "Error: Player 2 failed to play";
  } else {
    // Find the winner of the match
    resultMessage = getWinner();
  }

  return resultMessage;
}


// Compare the choices of both players
function getWinner() {
  let rps = ["rock", "paper", "scissors"];
  let p1 = rps.indexOf(p1choice);
  let p2 = rps.indexOf(p2choice);

  let result = p1 - p2;

  if (result == 1 || result == -2) {
    p1score++;
    return "Player 1 won";
  } else if (result == -1 || result == 2) {
    p2score++;
    return "Player 2 won";
  } else {
    return "Draw";
  }
}


// Show the result
function displayResult() {
  statusDisplay.innerHTML = getResult();
  p1imgDisplay.style.backgroundImage = "url('"+ handImages["p1"][p1choice] +"')";
  p2imgDisplay.style.backgroundImage = "url('"+ handImages["p2"][p2choice] +"')";
  p1scoreDisplay.innerHTML = p1score;
  p2scoreDisplay.innerHTML = p2score;
  playButton.innerHTML = "REMATCH";
}


// Reset the views
function resetDisplay() {
  p1choice = "unknown";
  p2choice = "unknown";
  p1imgDisplay.style.backgroundImage = "url('images/1q.png')";
  p2imgDisplay.style.backgroundImage = "url('images/2q.png')";
  statusDisplay.innerHTML = "READY";
}


// Set up the timer
function startTimer() {
  let count = 3;
  statusDisplay.style.color = "#fff";
  statusDisplay.style.backgroundColor = "#333";
  statusDisplay.innerHTML = "GO";

  let timerAnimation = setInterval(function() {
    if (count === 0) {
      // stop timer
      statusDisplay.innerHTML = count;
      clearInterval(timerAnimation);
    } else {
      statusDisplay.innerHTML = count--;
    }
  }, 1000);
}


// Start the match
function startMatch() {
  resetDisplay();
  var getInput = setInterval(play, 1000);
  startTimer();
  setTimeout(clearInterval(getInput), 4000);
  setTimeout(displayResult, 5000);
}


// Show and hide help window
function showHelp() {
  document.querySelector("#help").style.display = "flex";
}

function hideHelp() {
  document.querySelector("#help").style.display = "none";
}



/*
Theory behind the getWinner() function:

Let R = 0, P = 1, S = 2.
Let p1 represent player 1, and p2 for player 2.
The result is given by the difference between the choices of p1 and p2:
  result = p1 - p2;

Table with the results of all possible combinations:

            p2

         R  P  S
      R  0 -1 -2
p1    P  1  0 -1
      S  2  1  0

      e.g. p1 chooses R and p2 chooses S:
           result = p1 - p2
                  = R - S
                  = 0 - 2
                  = -2

Result meanings:
0 = draw
1 or -2 = p1 win
-1 or 2 = p1 lose
*/
