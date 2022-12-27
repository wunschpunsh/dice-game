'use strict';

const buttons = document.querySelectorAll('.btn');
const diceImage = document.querySelector('.dice');
const players = document.querySelectorAll('.player');
const scores = document.querySelectorAll('.score');
const currentScores = document.querySelectorAll('.current-score');
const descriptions = document.querySelectorAll('.description');

const TOTAL_WIN = 100;

let countCurrentScore = 0;
let playerNumber = 0;
let totalScores = [0, 0];

const createRandomNumber = () => {
  return Math.trunc(Math.random() * 6 + 1);
};

const getWinner = () => {
  totalScores.forEach((total, index) => {
    if (total >= TOTAL_WIN) {
      players.forEach(() => {
        players[index].classList.add('player--winner');
      });

      descriptions.forEach(elem => {
        elem.style.display = 'none';
        descriptions[index].style.display = 'block';
        descriptions[index].textContent = 'ПОБЕДИЛ';
      });

      buttons.forEach(button => {
        if (!button.classList.contains('btn--new')) {
          button.disabled = true;
        }
      });

      return;
    }
  });

  chooseAnotherPlayer();
};

const resetGame = () => {
  players.forEach((player, index) => {
    player.classList.remove('player--active');
    player.classList.remove('player--winner');

    if (index === 0) {
      player.classList.add('player--active');
    }
  });

  scores.forEach(score => {
    score.textContent = '0';
  });

  currentScores.forEach(current => {
    current.textContent = '0';
  });

  buttons.forEach(button => {
    button.disabled = false;
  });

  renderDiceImage('start');

  countCurrentScore = 0;
  playerNumber = 0;
  totalScores = [0, 0];
};

const chooseAnotherPlayer = () => {
  const currentPlayerScore = document.getElementById(
    `current--${playerNumber}`
  );

  players.forEach(player => {
    player.classList.toggle('player--active');
  });

  countCurrentScore = 0;
  currentPlayerScore.textContent = countCurrentScore;
  playerNumber = playerNumber === 0 ? 1 : 0;
};

const saveResult = () => {
  const totalPlayerScore = document.getElementById(`score--${playerNumber}`);

  totalScores[playerNumber] += countCurrentScore;
  totalPlayerScore.textContent = totalScores[playerNumber];
  getWinner();
};

const renderDiceImage = (randomNumber, start) => {
  if (start) {
    diceImage.src = `./img/dice${start}.png`;
  }

  diceImage.src = `./img/dice${randomNumber}.png`;
};

const throwDice = () => {
  const currentPlayerScore = document.getElementById(
    `current--${playerNumber}`
  );

  const randomNumber = createRandomNumber();

  renderDiceImage(randomNumber);

  if (randomNumber === 1) {
    chooseAnotherPlayer();
    return;
  }

  countCurrentScore += randomNumber;
  currentPlayerScore.textContent = countCurrentScore;
};

buttons.forEach(button => {
  button.addEventListener('click', evt => {
    if (evt.target.classList.contains('btn--roll')) {
      throwDice();
    }

    if (evt.target.classList.contains('btn--hold')) {
      saveResult();
    }

    if (evt.target.classList.contains('btn--new')) {
      resetGame();
    }
  });
});
