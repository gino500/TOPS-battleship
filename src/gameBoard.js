import { Ship } from "./ship";

class GameBoard {
  constructor() {
    this.board = this.createBoard();
    this.ship = [];
  }
  createBoard() {
    let arr = [];
    for (let i = 0; i < 10; ++i) {
      for (let j = 0; j < 10; ++j) {
        arr.push([i, j]);
      }
    }
    return arr;
  }
  createShips(shipCoordinates) {
    this.ship.push(new Ship(shipCoordinates));
  }
  receiveAttack(clickedCell, currCell, shipObj = this.ship) {
    let missed = true;

    shipObj.forEach(objCoordinate => {
      objCoordinate.coordinates.forEach(shipLocation => {
        if (
          shipLocation[0] === clickedCell[0] &&
          shipLocation[1] === clickedCell[1]
        ) {
          currCell.style.background = "red";
          missed = false;

          return objCoordinate.hit(
            [shipLocation[0], shipLocation[1]],
            objCoordinate,
            shipObj
          );
        }
      });
    });

    if (missed) this.missedAttack(currCell);
  }
  missedAttack(currCell) {
    currCell.style.background = "lightgreen";
  }
}

export { GameBoard };
