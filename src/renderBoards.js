import { GameBoard } from "./gameBoard";

const computerBoard = document.getElementById("computer-board");
const computer = new GameBoard();

function buildComputerBoard() {
  computer.board.forEach(square => {
    const cell = document.createElement("div");
    cell.id = "computer-cell";
    cell.setAttribute("data-computer", [square[0], square[1]]);

    return computerBoard.appendChild(cell);
  });
}
buildComputerBoard();

const playerBoard = document.getElementById("player-board");
const player = new GameBoard();

function buildPlayerBoard() {
  player.board.forEach(square => {
    const cell = document.createElement("div");
    cell.id = "player-cell";
    cell.setAttribute("data-player", [square[0], square[1]]);

    return playerBoard.appendChild(cell);
  });
}
buildPlayerBoard();

export { computer, player };
