import { GameBoard } from "./gameBoard";
import { Ship } from "./ship";

describe("GameBoard", () => {
  let board = new GameBoard();
  board.createShips([
    [0, 0],
    [0, 1],
    [0, 2],
  ]);
  //--
  test("Creates 10x10 Grid", () => {
    expect(board.board).toHaveLength(100);
  });
  //--
  test("Has Ship Class", () => {
    let ship = new Ship([
      [0, 0],
      [0, 1],
      [0, 2],
    ]);
    expect(board.ship).toMatchObject([ship]);
  });
  // --
  test("Received Attack is Hit()", () => {
    board.receiveAttack([0, 1]);
    expect(board.ship).toEqual([
      {
        coordinates: [
          [0, 0],
          [0, 2],
        ],
        length: 2,
      },
    ]);
  });
  // --
});

// attack -> hit()-> sunk()
// |
//  --> missed()
