const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
let foundHat = false;
let foundHole = false;
let outOfBounds = false;
let positionx = 0;
let positiony = 0;
class Field {
  constructor(grid) {
    this._grid = grid;
  }
  get grid() {
    return this._grid;
  }
  print() {
    this._grid.forEach(row => {
      console.log(row.toString());
    });
  }
  static createRandomSpot() {
        if ((Math.random() * 2) > 0.50) {
          return fieldCharacter;
        }
        else {
          return hole;        
        }
      }
  static createRandomRow(width) {
    let row = [];
    for (let i = 0; i < width; i++) {
      row.push(Field.createRandomSpot());
    }
    return row;
  }
  static generateField(height, width) {
    let newGrid = [];
    for (let i = 0; i < height; i++) {
      newGrid.push(Field.createRandomRow(width));
    }
    newGrid[0][0] = pathCharacter;
    newGrid[height - 1][width - 1] = hat;
    return newGrid;
  }
  moveUp() {
    try {
      if (this._grid[positionx - 1][positiony] === hat) {
        console.log("Congratulations, you won the game");
        foundHat = true;
      }
      else if (this._grid[positionx - 1][positiony] === hole) {
        console.log('You lose');
        foundHole = true;
      }
      else {
        this._grid[positionx - 1][positiony] = pathCharacter;
        this._grid[positionx][positiony] = pathCharacter;
        positionx--;
      }
    }
    catch(e) {
      console.log('Out of bounds');
      outOfBounds = true;
    }
  }
  moveDown() {
    try {
      if (this._grid[positionx + 1][positiony] === hat) {
        console.log("Congratulations, you won the game");
        foundHat = true;
      }
      else if (this._grid[positionx + 1][positiony] === hole) {
        console.log('You lose');
        foundHole = true;
      }
      else {
        this._grid[positionx + 1][positiony] = pathCharacter;
        this._grid[positionx][positiony] = pathCharacter;
        positionx++;
      }
    }
    catch(e) {
      console.log('Out of bounds');
      outOfBounds = true;
    }
  }
    moveLeft() {
    try {
      if (this._grid[positionx][positiony - 1] === hat) {
        console.log("Congratulations, you won the game");
        foundHat = true;
      }
      else if (this._grid[positionx][positiony - 1] === hole) {
        console.log('You lose');
        foundHole = true;
      }
      else {
        this._grid[positionx][positiony - 1] = pathCharacter;
        this._grid[positionx][positiony] = pathCharacter;
        positiony--;
      }
    }
    catch(e) {
      console.log('Out of bounds');
      outOfBounds = true;
    }
  }
    moveRight() {
    try {
      if (this._grid[positionx][positiony + 1] === hat) {
        console.log("Congratulations, you won the game");
        foundHat = true;
      }
      else if (this._grid[positionx][positiony + 1] === hole) {
        console.log('You lose');
        foundHole = true;
      }
      else {
        this._grid[positionx][positiony + 1] = pathCharacter;
        this._grid[positionx][positiony] = pathCharacter;
        positiony++;
      }
    }
    catch(e) {
      console.log('Out of bounds');
      outOfBounds = true;
    }
  }
}

const game = new Field(Field.generateField(6, 6));
while (!foundHat && !foundHole && !outOfBounds) {
  game.print()
  let input = prompt("Where would you like to move?");
  if (input === 'l') {
    game.moveLeft();
  }
  else if (input === 'r') {
    game.moveRight();
  }
  else if (input === 'd') {
    game.moveDown();
  }
  else if (input === 'u') {
    game.moveUp();
  }
  else {
    console.log('Sorry, not valid input.\n Enter l, r, d, or u');
  }
}

  

