// TODO: set endgame conditions
import React, { Component } from "react";
import { Board as BoardClass } from "../utilities/board";
import { Paper, Typography, Grid, Box } from "@material-ui/core";

//styles

const tilePaperStyle = {
  width: "60px",
  height: "60px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}

const colors = ["#E5F4E3", "#A1A6B4", "#94C5CC", "#BFCBC2","#B3C0A4", "#EDBBB4", "#381D2A", "#B0A1BA", "#79B791", "#81717A", "#EAEAEA", "#2C365E", "#CBC5EA", "#305252"];


let BoardObject = new BoardClass()
const shortid = require("shortid");

class Board extends Component {
  state = {
    canPlay: false,
    board: undefined
  };

  constructor() {
    super();
    this.state.board = BoardObject.board;
  }

  componentDidUpdate(prevProps) {
    this.gamePlay(prevProps);
  }

  move = direction => {
    const oldBoard = [...this.state.board];
    switch (direction) {
      case "up":
        BoardObject.shiftUp();
        break;
      case "down":
        BoardObject.shiftDown();
        break;
      case "left":
        BoardObject.shiftLeft();
        break;
      case "right":
        BoardObject.shiftRight();
        break;
      default:
        break;
    }



    if (!BoardObject.isEquivalentTo(oldBoard)) {
      const board = BoardObject.board;
      this.setState({ board }, this.addRandomTile());
    }
  };

  // TODO: make animation out of adding tile
  addRandomTile = () => {
    BoardObject.addRandomTile();
    const board = BoardObject.board;
    this.setState({ board });
  };

  gamePlay = prevProps => {
    // start conditions and effect
    if (prevProps.canPlay === false && this.props.canPlay === true) {
      this.startGame();
      return
    }
    // end conditions and effect
    if (BoardObject.canMove() === false) {
      this.endGame();
      return
    }
    // continue conditions and effect
  };

  startGame = () => {
    const canPlay = true;
    BoardObject = new BoardClass();
    BoardObject.addRandomTile();
    const board = BoardObject.board;
    this.setState({ canPlay, board });
  };

  endGame = () => {
    const canPlay = false;
    this.setState({ canPlay });
  };

  getTileStyle = (value) => {
    let style = {...tilePaperStyle}
    const color = colors[Math.max(0, Math.log2(value))%colors.length]
    style.backgroundColor = color
    return style 
  }
  
  renderTile = value => {
    const component = (
      <Paper style={this.getTileStyle(value)} key={shortid.generate()}>
        <Typography component="div" noWrap >
          <Box fontWeight="fontWeightBold" fontFamily="Monospace" fontSize={28}>
            {value}
          </Box>
        </Typography>
      </Paper>
    );

    return component;
  };

  renderRow = tiles => {
    const component = (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        key={shortid.generate()}
      >
        {tiles.map(tile => {
          return this.renderTile(tile);
        })}
      </Grid>
    );

    return component;
  };

  renderBoard = () => {
    const component = (
      <Grid container direction="column" justify="center" alignItems="center">
        {this.state.board.map(row => {
          return this.renderRow(row);
        })}
      </Grid>
    );

    return component;
  };

  render() {
    return (
        this.renderBoard()   
    );
  }
}

export default Board;
