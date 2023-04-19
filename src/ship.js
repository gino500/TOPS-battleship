class Ship {
  constructor(coordinates = null) {
    this.coordinates = coordinates;
    this.length = coordinates.length;
  }
  hit(location, currentShip) {
    let index = null;

    currentShip.coordinates.forEach((cord, i) => {
      if (cord[0] === location[0] && cord[1] === location[1]) {
        return (index = i);
      }
    });

    return (
      currentShip.coordinates.splice(index, 1),
      this.length--,
      this.isSunk(currentShip)
    );
  }
  isSunk(currShip) {
    if (currShip.length === 0) {
      // do something
    }
  }
}

export { Ship };
