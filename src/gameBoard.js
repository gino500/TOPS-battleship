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
    // get coordinates from Event
    // **hard code for now**
    this.ship.push(new Ship(shipCoordinates));
  }
  receiveAttack(clickedCell, shipObj = this.ship) {
    let missed = true;

    shipObj.forEach((objCoordinate) => {
      objCoordinate.coordinates.forEach((shipLocation) => {
        if (
          shipLocation[0] === clickedCell[0] &&
          shipLocation[1] === clickedCell[1]
        ) {
          missed = false;
          return objCoordinate.hit(
            [shipLocation[0], shipLocation[1]],
            objCoordinate
          );
        }
      });
    });
    if (missed) this.missedAttack(clickedCell);
  }
  missedAttack(clickedCell) {
    // to display missed attacks
    let arr = [];
    arr.push(clickedCell);
    return arr;
  }
}

export { GameBoard };
