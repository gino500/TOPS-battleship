class Ship {
  constructor(coordinates = null) {
    this.coordinates = coordinates;
    this.length = coordinates.length;
  }
  hit(location, currentShip, shipObj) {
    let index = null;

    currentShip.coordinates.forEach((coord, i) => {
      if (coord[0] === location[0] && coord[1] === location[1]) {
        return (index = i);
      }
    });
    return (
      currentShip.coordinates.splice(index, 1),
      this.length--,
      this.isSunk(currentShip, shipObj)
    );
  }
  isSunk(currShip, shipObj) {
    if (currShip.length === 0) {
      shipObj.forEach((obj, i) => {
        if (obj.coordinates.length === 0) {
          shipObj.splice(i, 1);
        }
      });
    }
  }
}

export { Ship };
