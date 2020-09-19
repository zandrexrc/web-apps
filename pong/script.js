// Init canvas
var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext("2d");


// Paddle
class Paddle {
  constructor(xPos, yPos, width, height, ySpeed, color) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height;
    this.ySpeed = ySpeed;
    this.color = color;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
  }

  move() {
    // Prevent paddle from going outside the canvas boundaries
    if (this.yPos <= 0 && this.ySpeed < 0) {
      this.ySpeed = 0;
    }
    if (this.yPos + this.height >= canvas.height && this.ySpeed > 0) {
      this.ySpeed = 0;
    }
    this.yPos += this.ySpeed;
  }
}


// Ball
class Ball {
  constructor(xPos, yPos, radius, xSpeed, ySpeed, color) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.radius = radius;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.xPos, this.yPos, this.radius, 2*Math.PI, 0);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  move(paddle1, paddle2) {
    this.xPos += this.xSpeed;
    this.yPos += this.ySpeed;

    // Ball edges/boundaries
    let top = this.yPos - this.radius;
    let bot = this.yPos + this.radius;
    let left = this.xPos - this.radius;
    let right = this.xPos + this.radius;

    // Ball hits top/bottom
    if (top < 0 || bot > canvas.height) {
      this.ySpeed = -this.ySpeed;
    }

    // Ball hits side edges of the canvas; reset ball and paddles positions
    if (left < 0) {
      paddle1.yPos = canvas.height/2 - paddle1.height/2;
      paddle2.yPos = canvas.height/2 - paddle2.height/2;
      this.xPos = paddle1.xPos + paddle1.width + this.radius;
      this.yPos = canvas.height/2;
      this.xSpeed = -this.xSpeed;
      this.ySpeed = 0;
    }
    if (right > canvas.width) {
      paddle1.yPos = canvas.height/2 - paddle1.height/2;
      paddle2.yPos = canvas.height/2 - paddle2.height/2;
      this.xPos = paddle2.xPos - paddle2.width - this.radius;
      this.yPos = canvas.height/2;
      this.xSpeed = -this.xSpeed;
      this.ySpeed = 0;
    }

    // Ball hits a paddle
    if (left == paddle1.xPos+paddle1.width && top < paddle1.yPos+paddle1.height && bot > paddle1.yPos) {
      this.xSpeed = -this.xSpeed;
      this.ySpeed = paddle1.ySpeed;
    }
    if (right == paddle2.xPos && top < paddle2.yPos+paddle2.height && bot > paddle2.yPos) {
      this.xSpeed = -this.xSpeed;
      this.ySpeed = paddle2.ySpeed;
    }
  }
}


// Game

// Init paddles and ball
var paddle1 = new Paddle(50, 130, 20, 100, 0, "white");
var paddle2 = new Paddle(530, 130, 20, 100, 0, "white");
var ball = new Ball(canvas.width/2, canvas.height/2, 10, 5, 0, "white");

// Scoreboard
var p1score = 0;
var p2score = 0;

// Set up controls for moving the paddles
document.onkeydown = function(e) {
  let key = e.keyCode;
  if (key == 87) { // "w": paddle 1 up
    paddle1.ySpeed = -2.5;
  }
  if (key == 83) { // "s": paddle 1 down
    paddle1.ySpeed = 2.5;
  }
  if (key == 38) { // "up arrow": paddle 2 up
    paddle2.ySpeed = -2.5;
  }
  if (key == 40) { // "down arrow": paddle 2 down
    paddle2.ySpeed = 2.5;
  }
}

// Update paddle speed when keys are released
document.onkeyup = function(e) {
  let key = e.keyCode;
  if (key == 87 || key == 83) {
    paddle1.ySpeed = 0;
  }
  if (key == 38 || key == 40) {
    paddle2.ySpeed = 0;
  }
}

// Track player scores
function checkScore() {
  // Check if ball goes out of bounds
  let left = ball.xPos - ball.radius;
  let right = ball.xPos + ball.radius;
  if (right >= canvas.width) {
    p1score++;
  }
  if (left <= 0) {
    p2score++;
  }

  // Display scores
  document.querySelector("#p1score").innerHTML = p1score;
  document.querySelector("#p2score").innerHTML = p2score;
}

// Start game animation
var gameAnimation;
function play() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Draw paddles
  paddle1.move();
  paddle1.draw();
  paddle2.move();
  paddle2.draw();
  // Draw ball
  ball.move(paddle1, paddle2);
  ball.draw();
  // Check for score
  checkScore();
  // Continue animation
  if (gameAnimation) {
    requestAnimationFrame(play);
  }
}
play();


// Start game
function start() {
  gameAnimation = true;
  requestAnimationFrame(play);
}

// Stop game
function stop() {
  gameAnimation = false;
  cancelAnimationFrame(play);
}
