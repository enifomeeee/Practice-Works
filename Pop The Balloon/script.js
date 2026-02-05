// Game variables
let score = 0;
let gameActive = false;
let timeLeft = 30;
let timerInterval;
const GOAL = 30;

// Array of balloon colors
const balloonColors = [
  "#EA5A47",
  "#4CAF50",
  "#2196F3",
  "#FFC107",
  "#9C27B0",
  "#FF69B4",
];

// Function to create a single balloon
function createBalloon() {
  // Create a div element for the balloon
  const balloon = document.createElement("div");
  balloon.className = "balloon";

  // Pick a random color
  const randomColor =
    balloonColors[Math.floor(Math.random() * balloonColors.length)];

  // Add the SVG inside the balloon div with random color
  balloon.innerHTML = `
        <svg width="80px" height="80px" viewBox="0 0 72 72" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <g id="color">
            <polygon fill="${randomColor}" points="33.9763,42.6906 34.0061,49.1497 34.0359,55.6089 28.1166,51.8019 22.1972,47.995 28.0868,45.3428"/>
            <circle cx="45" cy="27" r="23.0003" fill="${randomColor}"/>
            <path fill="${randomColor}" d="M60.8265,10.549c-1.3409-1.3409-2.8082-2.477-4.3606-3.4175c5.3598,8.8471,4.2238,20.5254-3.4175,28.1667 s-19.3196,8.7774-28.1667,3.4175c0.9405,1.5525,2.0767,3.0197,3.4175,4.3606c8.9822,8.9822,23.5452,8.9822,32.5273,0 C69.8087,34.0942,69.8087,19.5312,60.8265,10.549z"/>
          </g>
          <g id="line">
            <polyline fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2.1216" points="34,47.2098 34.01,49.1498 34.04,55.6098 28.12,51.7998 22.2,47.9998 28.09,45.3398 30.04,44.4598"/>
            <circle cx="45" cy="27" r="23.0003" fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="2"/>
            <path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M17.7253,65.09c0.5048,0.0395,1.0254-0.0002,1.547-0.1285c2.7035-0.6648,4.41-3.458,3.8116-6.2388"/>
            <path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M23.1406,58.907c-0.1631-0.4794-0.2535-0.9936-0.2582-1.5307c-0.0246-2.7839,2.2596-5.1284,5.102-5.2364"/>
          </g>
        </svg>
    `;

  // Generate random position (avoiding top-left corner where controls are)
  let randomX, randomY;
  do {
    randomX = Math.random() * (window.innerWidth - 80);
    randomY = Math.random() * (window.innerHeight - 80);
  } while (randomX < 300 && randomY < 120); // Avoid top-left area for controls

  // Set the balloon's position
  balloon.style.left = randomX + "px";
  balloon.style.top = randomY + "px";

  // Add click event to remove balloon and create new one
  balloon.addEventListener("click", function () {
    if (gameActive) {
      balloon.remove();
      score++;
      updateScore();

      // Check if player reached the goal
      if (score >= GOAL) {
        endGame(true);
      } else {
        createBalloon(); // Create a new balloon
      }
    }
  });

  // Add the balloon to the game container
  document.getElementById("game-container").appendChild(balloon);
}

// Function to update the score display
function updateScore() {
  document.getElementById("score").textContent = score;
}

// Function to update timer display
function updateTimer() {
  document.getElementById("timer").textContent = timeLeft;
}

// Function to start the countdown timer
function startTimer() {
  timerInterval = setInterval(function () {
    timeLeft--;
    updateTimer();

    if (timeLeft <= 0) {
      endGame(false);
    }
  }, 1000); // Update every 1 second
}

// Function to end the game
function endGame(won) {
  gameActive = false;
  clearInterval(timerInterval);

  // Remove all balloons
  document.getElementById("game-container").innerHTML = "";

  // Show game over modal
  const modal = document.getElementById("game-over-modal");
  const title = document.getElementById("result-title");
  const message = document.getElementById("result-message");

  if (won) {
    title.textContent = "🎉 You Win! 🎉";
    title.style.color = "#4CAF50";
    message.textContent = `Congratulations! You popped ${score} balloons with ${timeLeft} seconds remaining!`;
  } else {
    title.textContent = "😞 Game Over 😞";
    title.style.color = "#f44336";
    message.textContent = `Time's up! You only popped ${score} out of ${GOAL} balloons. Try again!`;
  }

  modal.classList.add("show");
}

// Function to start the game
function startGame() {
  // Reset variables
  score = 0;
  timeLeft = 30;
  gameActive = true;

  // Update displays
  updateScore();
  updateTimer();

  // Clear any existing balloons
  document.getElementById("game-container").innerHTML = "";

  // Hide game over modal
  document.getElementById("game-over-modal").classList.remove("show");

  // Create 5 balloons to start
  for (let i = 0; i < 5; i++) {
    createBalloon();
  }

  // Start the timer
  startTimer();
}

// Add event listener to start button
document.getElementById("start-btn").addEventListener("click", startGame);

// Add event listener to play again button
document.getElementById("play-again-btn").addEventListener("click", startGame);
