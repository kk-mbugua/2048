import React, { Component } from "react";
import "./App.css";
import Board from "./components/board";
import {Box }from "@material-ui/core"


const boxStyle = {
  width: "500px",
  height: "500px",
  background: "black"
}

class Tester extends Component {
  state = {
  };
  
  render() {
    return (
      <Box style={boxStyle}>
        <Board></Board>
      </Box>
    );
  }
}

export default Tester;
