let total_pl1 = 0;
let total_pl2 = 0;

const space_pl1 = document.querySelector(".rand-num-pl1");
const space_pl2 = document.querySelector(".rand-num-pl2");
const result_pl1 = document.querySelector(".result-pl1");
const result_pl2 = document.querySelector(".result-pl2");

function rollDice(player) {
  let space, result, total;
  if (player === 1) {
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
  const diceRoll = Math.floor(randomValue * 6) + 1;

  vid.src = `mp4/${diceRoll}.mp4`;
  space.appendChild(vid);

  vid.addEventListener('ended', function() {
    if (diceRoll != 6) {
      total += diceRoll;
      if (total === 20) {
        setTimeout(() => {
          result.innerHTML = "You Win";
        }, 1000);
      } else if (total > 20) {
        total -= diceRoll;
      }
    } else {
      setTimeout(() => {
        result.innerHTML = "Please Restart";
      }, 1000);
      total = 0;
    }
    result.innerHTML = `Result: ${total}`;
  });

  result.innerHTML = `Result: ${total}`;

  // Update the global total for the respective player
  if (player === 1) {
    total_pl1 = total;
  } else {
    total_pl2 = total;
  }
}

function rollDice1() {
  rollDice(1);
}

function rollDice2() {
  rollDice(2);
}
