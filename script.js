let total_pl1 = 0;
let total_pl2 = 0;
let currentPlayer = 1;

const space_pl1 = document.querySelector(".rand-num-pl1");
const space_pl2 = document.querySelector(".rand-num-pl2");
const result_pl1 = document.querySelector(".result-pl1");
const result_pl2 = document.querySelector(".result-pl2");
const resetButton = document.querySelector(".reset-game");

function rollDice() {
  let space, result, total;
  if (currentPlayer === 1) {
    space = space_pl1;
    result = result_pl1;
    total = total_pl1;
  } else {
    space = space_pl2;
    result = result_pl2;
    total = total_pl2;
  }

  // Clear previous video
  while (space.firstChild) {
    space.removeChild(space.firstChild);
  }

  const vid = document.createElement("video");
  vid.controls = false;
  vid.autoplay = true;
  vid.height = 150;
  vid.width = 150;

  const randomValue = Math.random();
  const diceRoll = Math.floor(randomValue * 6) +1 ;

  vid.src = `mp4/${diceRoll}.mp4`;
  space.appendChild(vid);

  vid.addEventListener('ended', function() {
    if (diceRoll != 6) {
      total += diceRoll;
      if (total === 20) {
        setTimeout(() => {
          result.innerHTML = "You Win";
        }, 1000);
        disableButtons();
        showResetButton();
        return;
      } else if (total > 20) {
        total -= diceRoll;
      }
    } else {
      setTimeout(() => {
        result.innerHTML = "Please Restart";
      }, 1000);
      total = 0;
    }

    // Update the global total for the respective player
    if (currentPlayer === 1) {
      total_pl1 = total;
    } else {
      total_pl2 = total;
    }

    result.innerHTML = `Result: ${total}`;
    switchPlayer();
  });

  result.innerHTML = `Result: ${total}`;
}

function switchPlayer() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  updateTurnIndicator();
}

function updateTurnIndicator() {
  document.querySelector(".turn-indicator").innerHTML = `Player ${currentPlayer}'s turn`;

  // Remove pulsing class from both buttons
  document.querySelector(".roll-dice1").classList.remove("pulsing");
  document.querySelector(".roll-dice2").classList.remove("pulsing");

  // Add pulsing class to the current player's button
  if (currentPlayer === 1) {
    document.querySelector(".roll-dice1").classList.add("pulsing");
  } else {
    document.querySelector(".roll-dice2").classList.add("pulsing");
  }
}

function disableButtons() {
  document.querySelector(".roll-dice1").disabled = true;
  document.querySelector(".roll-dice2").disabled = true;
}

function enableButtons() {
  document.querySelector(".roll-dice1").disabled = false;
  document.querySelector(".roll-dice2").disabled = false;
}

function showResetButton() {
  resetButton.style.display = 'block';
}

function hideResetButton() {
  resetButton.style.display = 'none';
}

function resetGame() {
  total_pl1 = 0;
  total_pl2 = 0;
  currentPlayer = 1;
  result_pl1.innerHTML = `Result: ${total_pl1}`;
  result_pl2.innerHTML = `Result: ${total_pl2}`;
  space_pl1.innerHTML = '';
  space_pl2.innerHTML = '';
  hideResetButton();
  enableButtons();
  updateTurnIndicator();
}

resetButton.addEventListener("click", resetGame);

document.querySelector(".roll-dice1").addEventListener("click", () => {
  if (currentPlayer === 1) rollDice();
});


document.querySelector(".roll-dice2").addEventListener("click", () => {
  if (currentPlayer === 2) rollDice();
});

updateTurnIndicator();
enableButtons();