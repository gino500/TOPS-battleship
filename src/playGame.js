import { computer, player } from "./renderBoards";
async function endGame() {
  await import("./endGame");
}

const computerCell = document.querySelectorAll("#computer-cell");
const playerCell = document.querySelectorAll("#player-cell");

function playerAttack() {
  let visited = [];
  computerCell.forEach(cell => {
    cell.addEventListener("click", e => {
      let repeat = false;
      let currCell = e.currentTarget;

      const data = cell.getAttribute("data-computer");
      let playerClick = [+data[0], +data[2]];

      visited.forEach(existingCoord => {
        if (
          existingCoord[0] === playerClick[0] &&
          existingCoord[1] === playerClick[1]
        )
          return (repeat = true);
      });
      if (repeat) return;

      visited.push(playerClick);
      computer.receiveAttack(playerClick, currCell);
      computerAttack();
      gameOverCondition();
    });
  });
}
playerAttack();

let visited = [];

function computerAttack() {
  let repeat = false;
  let currCell;

  let xPos = Math.floor(Math.random() * 10);
  let yPos = Math.floor(Math.random() * 10);
  let computerGuess = [xPos, yPos];

  visited.forEach(existingCoord => {
    if (
      existingCoord[0] === computerGuess[0] &&
      existingCoord[1] === computerGuess[1]
    )
      return (repeat = true);
  });
  if (repeat) return computerAttack();

  playerCell.forEach(cell => {
    let data = cell.getAttribute("data-player");
    if (computerGuess.toString() === data) return (currCell = cell);
  });

  visited.push(computerGuess);
  player.receiveAttack(computerGuess, currCell);
  gameOverCondition();
}

function gameOverCondition() {
  if (player.ship.length === 0 || computer.ship.length === 0) endGame();
}
