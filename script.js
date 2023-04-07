'use strict';

// Responsive? R: Yes

// This is a game where the player has to roll the dice and hold the current score into the total score, then the score will be 0 and automatically change to player 2. When we roll a 1 we loose the score and the other player keeps playing. With that's been said, the goal is to achieve 100 points :)

// SELECTING ELEMENTS FROM DOM
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
// SETTING DEFAULT VALUES

let scores, currentScore, activePlayer, playing;

const newGame = function () {
  // Setting all the game values

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  dice.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  btnHold.classList.remove('btn--winnerBlock');
  btnRoll.classList.remove('btn--winnerBlock');
  btnNew.classList.remove('btn--winnerNew');
};
newGame();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// ROLL DICE FUNCTIONALLITY
btnRoll.addEventListener('click', function () {
  if (playing) {
    const diceNum = Math.trunc(Math.random() * 6 + 1);
    dice.classList.remove('hidden');
    dice.src = `dice-${diceNum}.png`;

    if (diceNum !== 1) {
      currentScore = currentScore + diceNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// HOLD PLAYER'S SCORE
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      dice.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      btnHold.classList.add('btn--winnerBlock');
      btnRoll.classList.add('btn--winnerBlock');
      btnNew.classList.add('btn--winnerNew');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', newGame);
