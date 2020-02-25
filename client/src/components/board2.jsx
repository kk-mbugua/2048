import React, { Component } from "react";

import { HotKeys } from "react-hotkeys";

import {
  GridList,
  GridListTile,
  Paper,
  Typography,
  Button
} from "@material-ui/core";

class Board extends Component {
  state = {
    dim: 4,
    moveCounter: 0,
    tiles: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
    keymap: {
      MOVE_UP: "up",
      MOVE_DOWN: "down",
      MOVE_LEFT: "left",
      MOVE_RIGHT: "right"
    },
    handlers: {
      MOVE_UP: event => {
        this.move("up");
      },
      MOVE_DOWN: event => {
        this.move("down");
      },
      MOVE_LEFT: event => {
        this.move("left");
      },
      MOVE_RIGHT: event => {
        this.move("right");
      }
    }
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  initiateTiles = () => {
    let tiles = [...this.state.tiles];
    for (let x = 0; x < this.state.dim; x++) {
      let row = [0, 0, 0, 0];
      tiles.push(row);
    }
    this.setState({ tiles });
  };

  emptyTilesList = () => {
    let emptyTiles = [];
    for (let x = 0; x < this.state.dim; x++) {
      for (let y = 0; y < this.state.dim; y++) {
        if (this.state.tiles[x][y] === 0) {
          emptyTiles.push({ x: x, y: y });
        }
      }
    }
    return emptyTiles;
  };

  addRandomTile = () => {
    let emptyTilesList = this.emptyTilesList();
    let min = 0;
    let max = emptyTilesList.length;
    let coordinates =
      emptyTilesList[Math.floor(Math.random() * (+max - +min)) + +min];
    let min2 = 0;
    let max2 = 99;
    let twoOrFour = Math.floor(Math.random() * (+max2 - +min2)) + +min2;

    let tiles = [...this.state.tiles];
    tiles[coordinates["x"]][coordinates["y"]] = twoOrFour > 75 ? 4 : 2;
    this.setState({ tiles });
  };

  moveCase = direction => {
    const tiles = [...this.state.tiles];
    const dim = this.state.dim;
    let newTiles = [];

    switch (direction) {
      case "right":
        for (let x = 0; x < dim; x++) {
          newTiles.push(tiles[x].reverse());
        }
        break;
      case "down":
        for (let y = 0; y < dim; y++) {
          let subArray = [];
          for (let x = dim - 1; x >= 0; x--) {
            subArray.push(tiles[x][y]);
          }
          newTiles.push(subArray);
        }

        break;
      case "up":
        for (let y = 0; y < dim; y++) {
          let subArray = [];
          for (let x = 0; x < dim; x++) {
            subArray.push(tiles[x][y]);
          }
          newTiles.push(subArray);
        }
        break;
      default:
        newTiles = tiles;
        break;
    }

    return newTiles;
  };

  replaceTiles = (direction, newTiles) => {
    let tiles = [];
    const dim = this.state.dim;
    switch (direction) {
      case "right":
        for (let x = 0; x < dim; x++) {
          tiles.push(newTiles[x].reverse());
        }
        break;
      case "down":
        for (let y = dim - 1; y >= 0; y--) {
          let subArray = [];
          for (let x = 0; x < dim; x++) {
            subArray.push(newTiles[x][y]);
          }
          tiles.push(subArray);
        }
        console.log("done");
        break;
      case "up":
        for (let y = 0; y < dim; y++) {
          let subArray = [];
          for (let x = 0; x < dim; x++) {
            subArray.push(newTiles[x][y]);
          }
          tiles.push(subArray);
        }
        break;
      default:
        tiles = newTiles;
        break;
    }

    this.setState({ tiles });
  };

  move = direction => {
    let tiles = this.moveCase(direction);
    const dim = this.state.dim;

    for (let x = 0; x < dim; x++) {
      for (let y = 0; y < dim - 1; y++) {
        const value = tiles[x][y];
        if (value === 0) continue;
        for (let i = y + 1; i < dim; i++) {
          if (value === tiles[x][i]) {
            tiles[x][y] = value * 2;
            tiles[x][i] = 0;

            continue;
          }
        }
      }

      for (let y = 1; y < dim; y++) {
        let moveTo = y;
        for (let sy = y - 1; sy >= 0; sy--) {
          if (tiles[x][sy] === 0) {
            moveTo = sy;
          } else {
            break;
          }
        }
        tiles[x][moveTo] = tiles[x][y];
        tiles[x][y] = 0;
      }
    }
    this.replaceTiles(direction, tiles);
  };

  colorPicker = value => {
    const colors = [
      "Cornsilk",
      "BlanchedAlmond",
      "NavahoWhite",
      "BurlyWood",
      "RosyBrown",
      "SandyBrown",
      "DarkGoldenrod",
      "SandyBrown",
      "SaddleBrown",
      "Brown",
      "Maroon"
    ];
    const indice = Math.log2(value) % 11;
    return colors[indice];
  };

  renderTiles = () => {
    let components = [];
    let tiles = this.state.tiles;
    let dim = this.state.dim;
    for (let x = 0; x < dim; x++) {
      for (let y = 0; y < dim; y++) {
        const value = tiles[x][y];
        const printedValue = value === 0 ? "" : value;
        const elevation = value === 0 ? 0 : 2;
        const color = this.colorPicker(value);
        const comp = (
          <GridListTile key={x * 10 + y}>
            <Paper elevation={elevation} style={{ backgroundColor: color }}>
              {/* <Typography>{x+", "+y}</Typography> */}
              <Typography>{printedValue}</Typography>
            </Paper>
          </GridListTile>
        );
        components.push(comp);
      }
    }
    return components;
  };
  render() {
    return (
      <React.Fragment>
        <HotKeys keyMap={this.state.keymap} handlers={this.state.handlers}>
          <GridList cols={4} cellHeight={60}>
            {this.renderTiles()}
          </GridList>
          <Button onClick={this.addRandomTile}>Add Random Tile</Button>
          {/* <Button onClick={() => this.moveLeft()}>OG Left</Button> */}
          <Button onClick={() => this.move("left")}>Left</Button>
          <Button onClick={() => this.move("up")}>Up</Button>
          <Button onClick={() => this.move("down")}>Down</Button>
          <Button onClick={() => this.move("right")}>Right</Button>
        </HotKeys>
      </React.Fragment>
    );
  }
}

export default Board;
