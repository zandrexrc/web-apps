const responses = [
  // Positive
  "Fo sho",
  "no doubt <br>no doubt<br> no doubt",
  "Damn right",
  "Yessir",
  // Hesitant
  "I guess?",
  "Idk tbh",
  "Meh",
  "Yesn't",
  // Neutral
  "&#x2713; Seen <i>just now</i>",
  "Busy rn, ask me later",
  "Brb, ask again later",
  "Sry I didnt catch that",
  // Negative
  "Bruh",
  "Hell naw",
  "Mmmmm hm.",
  "Thats gonna be a <br>BIG YIKES<br> from me bro"
];

// Display a random response
function ask() {
  let response = responses[Math.floor(Math.random() * responses.length)];
  document.querySelector("#ballmessage").innerHTML = response;
}

// Allow user submit questions by pressing the enter button
document.querySelector("input").addEventListener("keydown", function(e) {
  if (e.keyCode == 13) {
    ask();
  }
});


// Show or hide disclaimer
function showDisclamer() {
  document.querySelector("#disclaimer").style.display = "flex";
}

function hideDisclaimer() {
  document.querySelector("#disclaimer").style.display = "none";
}
