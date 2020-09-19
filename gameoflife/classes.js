/**
 * Represents a cell.
 */
class Cell {
  constructor() {
    this.alive = false;
  }

  isAlive() {
    return this.alive;
  }

  changeStatus(status) {
    this.alive = status == "alive";
  }

  getSymbol() {
    // Returns the visual representation of the cell
    return this.alive ? "&#x25CF;" : ".";
  }
}


/**
 * Represents the game.
 */
class Game {

  /**
   * @constructor
   * @param {int} numRows - number of rows in the grid
   * @param {int} numColumns - number of columns in the grid
   */
  constructor(numRows, numColumns) {
    this.numRows = numRows;
    this.numColumns = numColumns;
    this.grid = [];
    this.currentGeneration = 0;
    this.aliveCellsCount = 0;
    this.initGrid();
  }


  /**
   * Determines the initial state of the grid.
   * Generates alive cells randomly.
   */
  initGrid() {
    let grid = [];

    for (var i = 0; i < this.numRows; i++) {
      let row = [];
      for (var j = 0; j < this.numColumns; j++) {

        // Generate new cell
        let cell = new Cell();

        // Randomly mark cell as alive
        if (Math.floor(Math.random() * 4) == 3) {
          cell.changeStatus("alive");
          this.aliveCellsCount++;
        }

        row.push(cell);
      }
      grid.push(row);
    }

    this.grid = grid;
  }


  /**
   * Updates the status of each cell.
   */
  updateGrid() {
    let revivedCells = [];
    let diedCells = [];
    this.aliveCellsCount = 0;

    for (var i = 0; i < this.numRows; i++) {
      for (var j = 0; j < this.numColumns; j++) {
        let cell = this.grid[i][j];

        // Check status of surrounding cells
        let aliveNeighborsCount = this.countAliveNeighbors(j, i);

        // Determine cell's status
        if (cell.isAlive()) {
          if (aliveNeighborsCount < 2 || aliveNeighborsCount > 3) {
            diedCells.push(cell);
          } else {
            this.aliveCellsCount++;
          }
        } else {
          if (aliveNeighborsCount == 3) {
            revivedCells.push(cell);
            this.aliveCellsCount++;
          }
        }
      }
    }

    // Change cell's status
    revivedCells.forEach((cell) => {
      cell.changeStatus("alive");
    });
    diedCells.forEach((cell) => {
      cell.changeStatus("dead");
    });

    // Update generation number
    this.currentGeneration++;
  }


  /**
   * Counts the number of alive neighbors of a given cell.
   * @param {int} x - the column in which the cell is located.
   * @param {int} y - the row in which the cell is located.
   */
  countAliveNeighbors(x, y){
    let aliveCount = 0;

    // Find neighbors
    for (var yOffset = -1; yOffset < 2; yOffset++) {
      for (var xOffset = -1; xOffset < 2; xOffset++) {
        let xPos = x + xOffset;
        let yPos = y + yOffset;
        if (!(xPos == x && yPos == y)) {
          if (!(xPos < 0 || yPos < 0 || xPos > this.numColumns-1 || yPos > this.numRows-1)) {
            // Increment alive counter if neighbor is alive
            if (this.grid[yPos][xPos].isAlive()) {
              aliveCount++;
            }
          }
        }
      }
    }

    return aliveCount;
  }


  /**
   * Prints the grid on an HTML table.
   * @param {<table>} table - the HTML table onto which the grid is displayed.
   */
  printGrid(table) {
    // Display grid
    table.innerHTML = "";
    for (var i = 0; i < this.numRows; i++) {
      let row = "<tr>";
      for (var j = 0; j < this.numColumns; j++) {
        let prefix = this.grid[i][j].isAlive() ? "<td class='alive'>" : "<td>";
        let cell = prefix + this.grid[i][j].getSymbol(); + "</td>";
        row += cell;
      }
      row += "</tr>";
      table.innerHTML += row;
    }
  }
}
