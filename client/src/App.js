import React, { Component } from "react";
import "./App.css";
import Board from "./components/board";
import Instructions from "./components/instructions";
import { Grid, Box, Fab } from "@material-ui/core";

class App extends Component {
  state = {
    canPlay: false,
    move: undefined
  };
  
  onClickStart = () => {
    this.setState({ canPlay: true });
  };

  move = (direction) => {
    this.refs.boardReference.move(direction)
  }


  handleKeyDown = (event) => {
    if (!this.state.canPlay) {
      return
    }
    const keyCode = event.keyCode
    switch (keyCode) {
      case 37: // Left
        this.move("left")
        break
      case 38: // Up
        this.move("up")
        break
      case 39: // Right
        this.move("right")
        break
      case 40: // Down
        this.move("down")
        break
      default:
        break
    }
  }

  renderStartButton = () => {
    const component = (
      <Fab
        style={{}}
        size="large"
        color="secondary"
        onClick={() => {
          this.onClickStart();
        }}
      >
        Start
      </Fab>
    );

    return component;
  };

 
  render() {
    return (
      <Box tabIndex="0" bgcolor="#6A827D" maxWidth="lg"onKeyUp={(event)=>{this.handleKeyDown(event)}}>
        <Grid container direction="column" alignItems="center" >
          <Grid item md={8}>
            <Box style={{}}>
              <Instructions></Instructions>
            </Box>
          </Grid>
          <Grid item md={4} style={{}}>
            <Box>
              <Board ref={"boardReference"} canPlay={this.state.canPlay} move={this.state.move}></Board>
              </Box>
          </Grid>
          <Grid item md={4}>
            {this.renderStartButton()}
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default App;
