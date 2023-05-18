import "./renderBoards";
import { computer, player } from "./renderBoards";
async function playGame() {
  await import("./playGame");
}

const playerCells = document.querySelectorAll("#player-cell");
const shipsOnBoard = document.querySelectorAll(".draggable");
const shipContainer = document.querySelector("#ship-container");
const getShips = [...document.querySelector("#ship-container").children];
const draggables = document.querySelectorAll(".draggable");
const flipShipsBTN = document.getElementById("ship-btn");
let angleOfShips = 0;

function dragDrop() {
  draggables.forEach(draggable => {
    draggable.addEventListener("dragstart", () => {
      if (draggable.classList.contains("taken")) return;
      draggable.classList.add("dragging");
    });
    draggable.addEventListener("dragend", e => {
      draggable.classList.remove("dragging");
      getShipInCell(e);
    });
  });
  dragging();
}
dragDrop();

function dragging() {
  playerCells.forEach(cell => {
    cell.addEventListener("dragover", e => {
      e.preventDefault();
      const dragging = document.querySelector(".dragging");
      if (!dragging) return;
      cell.appendChild(dragging);

      if (e.currentTarget.children[0].className.split(" ")[2] === "taken") {
        dragging.classList.remove("taken");
        dragging.style.transform = `rotate(${angleOfShips}deg)`;
        shipContainer.appendChild(dragging);
        return;
      }
      dragging.classList.add("taken");
      resizeShips();
    });
  });
}

function rotateShips() {
  flipShipsBTN.addEventListener("click", () => {
    angleOfShips = angleOfShips === 0 ? 90 : 0;
    getShips.forEach(ship => {
      if (ship.classList.contains("taken")) return;
      ship.style.transform = `rotate(${angleOfShips}deg)`;
    });
  });
}
rotateShips();

function resizeShips() {
  shipsOnBoard.forEach(ship => {
    if (ship.classList.contains("dragging")) {
      ship.style.width = "20px";
    }
  });
}

function getShipInCell(event) {
  let currShipClass = event.target.classList;
  let currTarget = event.target;
  let length;
  let color;

  if (currShipClass.contains("carrier")) {
    validPlayerShip(currTarget.parentNode, (length = 5), (color = "black"));
  }
  if (currShipClass.contains("battleship")) {
    validPlayerShip(currTarget.parentNode, (length = 4), (color = "blue"));
  }
  if (currShipClass.contains("submarine")) {
    validPlayerShip(currTarget.parentNode, (length = 3), (color = "yellow"));
  }
  if (currShipClass.contains("destroyer")) {
    validPlayerShip(currTarget.parentNode, (length = 3), (color = "purple"));
  }
  if (currShipClass.contains("patrol")) {
    validPlayerShip(currTarget.parentNode, (length = 2), (color = "pink"));
  }
}

function validPlayerShip(currCell, length, color) {
  if (!currCell) return;
  let child = currCell.children[0];

  let currCoord = currCell.getAttribute("data-player");
  if (!currCoord) return;

  let dataAttributes = [+currCoord[0], +currCoord[2]];
  let xPos = dataAttributes[0];
  let yPos = dataAttributes[1];

  if (
    (angleOfShips === 0 && yPos + length - 1 > 9) ||
    (angleOfShips === 90 && xPos + length - 1 > 9)
  ) {
    shipContainer.appendChild(child);
    child.classList.remove("taken");
    child.style = "none";
    child.style.transform = `rotate(${angleOfShips}deg)`;
    return;
  }
  currCell.style.background = `${color}`;
  child.style.background = "none";
  playerCoordinates(dataAttributes);

  for (let i = 0; i < length - 1; ++i) {
    if (angleOfShips === 0) {
      yPos += 1;
      dataAttributes[1] = yPos;
    } else {
      xPos += 1;
      dataAttributes[0] = xPos;
    }
    let clone = child.cloneNode(true);
    appendShipToCells(dataAttributes.toString(), clone, color);
    playerCoordinates(dataAttributes);
  }
}

function appendShipToCells(currDataAttribute, clonedCell, color) {
  playerCells.forEach(cell => {
    let allDataAttributes = cell.getAttribute("data-player");

    if (allDataAttributes === currDataAttribute) {
      cell.appendChild(clonedCell);
      cell.style.background = `${color}`;
    }
  });
}

let allPlayerCoords = [];

function playerCoordinates(shipCoordinates) {
  allPlayerCoords.push([...shipCoordinates]);

  if (allPlayerCoords.length < 17) return;
  let shipLengths = [5, 4, 3, 3, 2];

  shipLengths.forEach(length =>
    player.createShips(allPlayerCoords.splice(0, length))
  );
  playGame();
}

// AI

let recall = false;

function getComputerShipProperties() {
  let ships = ["carrier", "battleship", "destroyer", "submarine", "patrol"];
  let length;

  ships.forEach(ship => {
    if (ship === "carrier") {
      createPositions((length = 5));
    }
    if (ship === "battleship") {
      createPositions((length = 4));
    }
    if (ship === "destroyer") {
      createPositions((length = 3));
    }
    if (ship === "submarine") {
      createPositions((length = 3));
    }
    if (ship === "patrol") {
      createPositions((length = 2));
    }
  });
}

function createPositions(length) {
  let currCoord = [];

  let shipDirection = Math.floor(Math.random() * 2);
  let inRange = 10 - length;
  let xPos = Math.floor(Math.random() * inRange);
  let yPos = Math.floor(Math.random() * inRange);

  for (let i = 0; i < length; ++i) {
    if (shipDirection === 0) {
      yPos += 1;
    } else {
      xPos += 1;
    }
    currCoord.push([xPos, yPos]);
  }
  preventRepeatingCoordinates(currCoord, length);
}

let allCoords = [];

function preventRepeatingCoordinates(currCoord) {
  allCoords.forEach(existingCoord => {
    currCoord.forEach(newCoord => {
      if (
        existingCoord[0] === newCoord[0] &&
        existingCoord[1] === newCoord[1]
      ) {
        recall = true;
      }
    });
  });
  if (recall) return (allCoords.length = 0);
  else return allCoords.push(...currCoord);
}

function getValidArray() {
  while (allCoords.length === 0) {
    recall = false;
    getComputerShipProperties();
  }
}
getValidArray();

function computerCoordinates() {
  if (allCoords.length < 17) return;
  let shipLengths = [5, 4, 3, 3, 2];
  shipLengths.forEach(length =>
    computer.createShips(allCoords.splice(0, length))
  );
}
computerCoordinates();
