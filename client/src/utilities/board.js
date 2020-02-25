export class Board {
  dim = undefined;
  board = [];

  constructor(dimension) {
    if (dimension === undefined) {
        dimension = 4
    }
    this.dim = dimension;
    this.fillBoard()
  }

  fillBoard() {
    let board = [];
    for (let row = 0; row < this.dim; row++) {
      const new_array = Array(this.dim).fill(0);
      board.push(new_array);
    }
    this.board = board;
  }

  emptyTilesList() {
    let emptyTiles = [];
    for (let x = 0; x < this.dim; x++) {
      for (let y = 0; y < this.dim; y++) {
        if (this.board[x][y] === 0) {
          emptyTiles.push({ row: x, col: y });
        }
      }
    }
    return emptyTiles;
  }

  getRandomEmptyTile(){
    let emptyTilesList = this.emptyTilesList();
    if (emptyTilesList <= 0) {
      return;
    }
    let min = 0;
    let max = emptyTilesList.length;
    let coordinates =
      emptyTilesList[Math.floor(Math.random() * (+max - +min)) + +min];

    return coordinates
  }

  getValueToAdd(oddsForTwo){
    if (oddsForTwo === undefined){
        oddsForTwo = 0.75
    }
    const max = 0.99
    const min= 0.0

    let twoOrFour = Math.random() * (max - min) + min;

    return twoOrFour > oddsForTwo ? 4 : 2;
  }

  addTile(row, column, value){
    if(this.board[row][column] === 0){
      this.board[row][column] = value
    }
  }

  addRandomTile() {
    const tile = this.getRandomEmptyTile()
    const value = this.getValueToAdd()
    this.addTile(tile.row, tile.col, value)
}

  canMove() {
    return this.emptyTilesList().length !== 0;
  }

  setboard(board) {
      this.board = board
  }

  isEquivalentTo(board){

    if (board.board === undefined && board[0][0] === undefined && board === undefined){
        console.log("NOT of type Board or Internal board Data Structure")
        return false
    }
    
    var thisBoard = this.board.toString()
    var otherBoard = undefined

    if (board.board !== undefined){
        otherBoard = board.board.toString()
    } else {

        otherBoard = board.toString()
    }

    return thisBoard === otherBoard
  }

  boardsAreEqual(board1, board2){
      if (typeof(board1) !== typeof(board2)) {
          console.log("You are NOT comparing same types")
          return false
      }
      if (typeof(board1) === typeof(this)) {
          return board1.isEquivalentTo(board2)
      } else {
        const thisBoard = board1.toString()
        const otherBoard = board2.toString()
        return thisBoard === otherBoard
      }

  }

  // TODO: try optimize and/or make more efficient
  // TODO: rethink alg, how about setting the iterating variable start and next value in function and/or with objects
  shifRowLeft = (ogRow) => {
    let row = [...ogRow]

    for (let col = 1; col < this.dim; col ++) {
      const tile = row[col]
      if (tile === 0) {
        continue
      }

      let index = col
      while (index > 0 && row[index-1] === 0) {
        index --
      }

      row[col] = 0

      if (row[index-1] === tile) {
        row[index-1] = tile*2

      } else {
        row[index] = tile
      }
    }

    return row
  }

  shifRowRight(ogRow) {
    let row = [...ogRow]
  
    for (let col = this.dim-2; col >= 0; col --) {
      const tile = row[col]
      if (tile === 0) {
        continue
      }

      let index = col
      while (index < this.dim && row[index+1] === 0) {
        index ++
      }

      row[col] = 0
      if (row[index+1] === tile) {
        row[index+1] = tile*2

      } else {
        row[index] = tile
      }
    }

    return row
  }


  shiftLeft() {
    let board = []
    for (let row = 0; row < this.dim; row++) {
      const newRow = this.shifRowLeft(this.board[row])
      board.push(newRow)
    }
    this.setboard(board)
  }

  shiftRight() {
    let board = []
    for (let row = 0; row < this.dim; row++) {
      const newRow = this.shifRowRight(this.board[row])
      board.push(newRow)
    }
    
    this.setboard(board)

  }

  shiftUp() {
    this.setboard(this.transpose(this.board))
    this.shiftLeft()
    this.setboard(this.transpose(this.board))
  }

  shiftDown() {
    this.setboard(this.transpose(this.board))
    this.shiftRight()
    this.setboard(this.transpose(this.board))
  }


  // TODO: understand this. It is important to see what is happening here.
  transpose = matrix => {
    return matrix[0].map((col, i) => matrix.map(row => row[i]));
  };
}

