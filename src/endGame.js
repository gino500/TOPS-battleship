import { player } from "./renderBoards";

function displayWinner() {
  player.ship.length === 0 ? alert("You lose, Bye!") : alert("You Win, nice!");
  resetGame();
}
displayWinner();

function resetGame() {
  location.reload();
}
